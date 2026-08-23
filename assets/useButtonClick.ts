import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useButtonClick = (href?: string, onClick?: () => void) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Native, instant jump. No smooth-scroll library and no `behavior: "smooth"`:
  // the browser puts the section at the top the moment the link is clicked, so
  // the scrollbar never animates out from under the user.
  const scrollToElement = (sectionId: string, delay: number = 100) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ block: "start" });
    }, delay);
  };

  const handleClick = (e?: React.MouseEvent) => {
    if (href) {
      const isExternalLink = /^(https?:\/\/|www\.)/.test(href);
      const isEmailOrPhone = /^(mailto:|tel:)/.test(href);

      if (isExternalLink) {
        // preventDefault so an <a href="external"> doesn't ALSO navigate the
        // current tab — the link opens only in a new tab.
        e?.preventDefault();
        window.open(
          href.startsWith("www.") ? `https://${href}` : href,
          "_blank",
          "noopener,noreferrer"
        );
      } else if (isEmailOrPhone) {
        // Let browser handle mailto:/tel: naturally
        onClick?.();
        return;
      } else if (href.startsWith("/")) {
        e?.preventDefault();
        const [path, hash] = href.split("#");

        if (path !== location.pathname) {
          navigate(path);
          if (hash) {
            setTimeout(() => {
              scrollToElement(hash, 100);
            }, 100);
          }
        } else if (hash) {
          scrollToElement(hash, 50);
        }
      } else if (href.startsWith("#")) {
        e?.preventDefault();
        scrollToElement(href.slice(1), 50);
      } else {
        e?.preventDefault();
        scrollToElement(href, 50);
      }
    }
    onClick?.();
  };

  return handleClick;
};
