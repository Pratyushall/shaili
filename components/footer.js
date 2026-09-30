"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";


export default function Footer() {
  const [
    visible,
    setVisible,
  ] = useState(false);


  const lastScrollY =
    useRef(0);


  const ticking =
    useRef(false);


  useEffect(() => {
    lastScrollY.current =
      window.scrollY;


    function updateFooter() {
      const currentScrollY =
        window.scrollY;


      const difference =
        currentScrollY -
        lastScrollY.current;


      /* =====================================================
         VERY TOP OF PAGE

         Footer should never float around while
         the visitor has barely started scrolling.
      ===================================================== */

      if (
        currentScrollY <
        120
      ) {
        setVisible(
          false
        );
      }


      /* =====================================================
         SCROLLING DOWN

         Show image.
      ===================================================== */

      else if (
        difference >
        5
      ) {
        setVisible(
          true
        );
      }


      /* =====================================================
         SCROLLING UP

         Hide image.
      ===================================================== */

      else if (
        difference <
        -5
      ) {
        setVisible(
          false
        );
      }


      lastScrollY.current =
        currentScrollY;


      ticking.current =
        false;
    }


    function handleScroll() {
      if (
        ticking.current
      ) {
        return;
      }


      ticking.current =
        true;


      window.requestAnimationFrame(
        updateFooter
      );
    }


    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );


    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);


  return (
    <footer
      className={`
        scroll-footer

        ${
          visible
            ? "scroll-footer-visible"
            : ""
        }
      `}

      aria-hidden="true"
    >

      <div
        className="
          scroll-footer-image-wrap
        "
      >

        <img
          src="/images/footer.png"

          alt=""

          className="
            scroll-footer-image
          "

          draggable="false"
        />

      </div>

    </footer>
  );
}