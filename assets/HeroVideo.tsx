import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cls } from "./utils";

/* Full-bleed video hero.

   The video plays itself at one viewport height — no 300vh spacer, no sticky
   frame, no ScrollTrigger scrub. Scrolling moves the page exactly as far as the
   wheel says it should; the hero simply leaves as you pass it.

   The cinematic feel comes from two things that never touch scroll position:
   a clip-path wipe that opens the frame from a centre band once the first frame
   is decodable (hiding the pop-in), and an exit parallax that drifts and zooms
   the media as the hero scrolls away. Both are scroll-linked at most, never
   scroll-blocking.

   A poster carries the hero if the video is slow or blocked, and reduced-motion
   users get a still frame instead of a loop. */

const READY_TIMEOUT = 8000;
const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

type HeroVideoProps = {
  videoSrc: string;
  /** Shown while the video buffers, and if it never arrives. */
  posterSrc?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
};

const HeroVideo = ({
  videoSrc,
  posterSrc,
  title,
  description,
  actions,
  className,
}: HeroVideoProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  // Exit parallax: the media drifts down and zooms as the hero scrolls off.
  // The page still travels 1:1 with the wheel — only the layer inside moves.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Wait for a decodable frame so the wipe doesn't open onto nothing.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 3) {
      setReady(true);
      return;
    }
    const onReady = () => setReady(true);
    video.addEventListener("loadeddata", onReady, { once: true });
    const fallback = window.setTimeout(onReady, READY_TIMEOUT);
    return () => {
      video.removeEventListener("loadeddata", onReady);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      className={cls("relative h-svh w-full overflow-hidden", className)}
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className={cls(
            "size-full object-cover transition-opacity duration-500 motion-reduce:hidden",
            ready ? "opacity-100" : "opacity-0"
          )}
        />
        {posterSrc ? (
          <img
            src={posterSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 hidden size-full object-cover motion-reduce:block"
          />
        ) : null}
      </motion.div>

      {/* Clip-path wipe: the frame opens from a centre band rather than fading,
          which hides the moment the first video frame pops in. */}
      <motion.div
        initial={{ clipPath: "inset(45% 0% 45% 0%)" }}
        animate={ready ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.1, ease: EASE_OUT_QUINT }}
        className="absolute inset-0 bg-background/20"
        aria-hidden="true"
      />

      <div className="relative z-10 h-full w-content-width mx-auto flex flex-col justify-end pb-24 text-background">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_QUINT }}
          className="text-6xl md:text-9xl font-medium text-balance"
        >
          {title}
        </motion.h1>

        {description ? (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT_QUINT }}
            className="mt-6 max-w-xl text-lg opacity-80"
          >
            {description}
          </motion.p>
        ) : null}

        {actions ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT_QUINT }}
            className="mt-10 flex flex-wrap gap-4"
          >
            {actions}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
};

export default HeroVideo;
