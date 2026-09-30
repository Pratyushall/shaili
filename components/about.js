"use client";

import Link from "next/link";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";


/* =========================================================
   COPY + ROUTES
========================================================= */

const lines = [
  {
    text:
      "I take pictures to feed my soul.",

    href:
      "/photos",
  },

  {
    text:
      "I started building websites for the love of it.",

    href:
      "/projects",
  },

  {
    text:
      "I edit videos because I’ve always liked seeing life as a film.",

    href:
      "/videos",
  },

  {
    text:
      "I make things to understand how I’m feeling.",

    href:
      "/",
  },
];


/* =========================================================
   MOBILE CHECK
========================================================= */

function useIsMobile() {
  const [
    isMobile,
    setIsMobile,
  ] =
    useState(false);


  useEffect(() => {
    const media =
      window.matchMedia(
        "(max-width: 700px)"
      );


    function update() {
      setIsMobile(
        media.matches
      );
    }


    update();


    media.addEventListener?.(
      "change",
      update
    );


    return () => {
      media.removeEventListener?.(
        "change",
        update
      );
    };
  }, []);


  return isMobile;
}


/* =========================================================
   ONE ABOUT LINE
========================================================= */

function AboutLine({
  item,
  index,
  isMobile,
  desktopActive,
  setDesktopActive,
  mobileActive,
  setMobileActive,
}) {
  const lineRef =
    useRef(null);


  const inView =
    useInView(
      lineRef,
      {
        amount:
          0.58,

        margin:
          "-12% 0px -12% 0px",
      }
    );


  useEffect(() => {
    if (
      isMobile &&
      inView
    ) {
      setMobileActive(
        index
      );
    }
  }, [
    inView,
    index,
    isMobile,
    setMobileActive,
  ]);


  const activeIndex =
    isMobile
      ? mobileActive
      : desktopActive;


  const isActive =
    activeIndex ===
    index;


  const hasActive =
    activeIndex !==
    null;


  return (
    <motion.div
      ref={
        lineRef
      }

      className={`
        about-line-wrap
        about-line-wrap-${index + 1}
      `}

      initial={{
        opacity:
          0,

        y:
          45,
      }}

      whileInView={{
        opacity:
          1,

        y:
          0,
      }}

      viewport={{
        once:
          true,

        amount:
          0.28,
      }}

      transition={{
        delay:
          index *
          0.11,

        duration:
          0.9,

        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}
    >

      <motion.div
        className="
          about-line-motion
        "

        animate={{
          scale:
            isActive

              ? (
                  isMobile
                    ? 1
                    : 1.045
                )

              : 1,

          x:
            isActive &&
            !isMobile
              ? 28
              : 0,

          opacity:
            hasActive

              ? (
                  isActive

                    ? 1

                    : (
                        isMobile
                          ? 0.3
                          : 0.38
                      )
                )

              : 1,

          filter:
            hasActive &&
            !isActive

              ? (
                  isMobile
                    ? "blur(1.2px)"
                    : "blur(1.7px)"
                )

              : "blur(0px)",
        }}

        transition={{
          scale: {
            type:
              "spring",

            stiffness:
              95,

            damping:
              20,

            mass:
              0.9,
          },

          x: {
            type:
              "spring",

            stiffness:
              90,

            damping:
              20,

            mass:
              0.9,
          },

          opacity: {
            duration:
              0.38,
          },

          filter: {
            duration:
              0.42,
          },
        }}
      >

        <Link
          href={
            item.href
          }

          scroll={
            true
          }

          className="
            about-line
          "

          onMouseEnter={() => {
            if (
              !isMobile
            ) {
              setDesktopActive(
                index
              );
            }
          }}

          onFocus={() => {
            if (
              !isMobile
            ) {
              setDesktopActive(
                index
              );
            }
          }}

          onBlur={() => {
            if (
              !isMobile
            ) {
              setDesktopActive(
                null
              );
            }
          }}
        >
          {item.text}
        </Link>

      </motion.div>


      <motion.div
        className="
          about-line-glow
        "

        animate={{
          opacity:
            isActive
              ? 1
              : 0,

          scale:
            isActive
              ? 1
              : 0.88,
        }}

        transition={{
          duration:
            0.7,

          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        }}
      />

    </motion.div>
  );
}


/* =========================================================
   ABOUT
========================================================= */

export default function About() {
  const sectionRef =
    useRef(null);


  const isMobile =
    useIsMobile();


  const reducedMotion =
    useReducedMotion();


  const [
    desktopActive,
    setDesktopActive,
  ] =
    useState(null);


  const [
    mobileActive,
    setMobileActive,
  ] =
    useState(0);


  /* =======================================================
     POINTER ATMOSPHERE
  ======================================================= */

  const pointerX =
    useMotionValue(0);


  const pointerY =
    useMotionValue(0);


  const smoothPointerX =
    useSpring(
      pointerX,
      {
        stiffness:
          40,

        damping:
          20,

        mass:
          1.2,
      }
    );


  const smoothPointerY =
    useSpring(
      pointerY,
      {
        stiffness:
          40,

        damping:
          20,

        mass:
          1.2,
      }
    );


  const cloudOneX =
    useTransform(
      smoothPointerX,
      [-1, 1],
      [-16, 16]
    );


  const cloudOneY =
    useTransform(
      smoothPointerY,
      [-1, 1],
      [-12, 12]
    );


  const cloudTwoX =
    useTransform(
      smoothPointerX,
      [-1, 1],
      [22, -22]
    );


  const cloudTwoY =
    useTransform(
      smoothPointerY,
      [-1, 1],
      [-8, 14]
    );


  const cloudThreeX =
    useTransform(
      smoothPointerX,
      [-1, 1],
      [-10, 18]
    );


  const cloudThreeY =
    useTransform(
      smoothPointerY,
      [-1, 1],
      [14, -10]
    );


  const mistX =
    useTransform(
      smoothPointerX,
      [-1, 1],
      [-20, 20]
    );


  /* =======================================================
     POINTER
  ======================================================= */

  function handlePointerMove(
    event
  ) {
    if (
      isMobile ||
      reducedMotion ||
      !sectionRef.current
    ) {
      return;
    }


    const rect =
      sectionRef.current
        .getBoundingClientRect();


    const x =
      (
        (
          event.clientX -
          rect.left
        )
        /
        rect.width
      )
      *
      2
      -
      1;


    const y =
      (
        (
          event.clientY -
          rect.top
        )
        /
        rect.height
      )
      *
      2
      -
      1;


    pointerX.set(
      x
    );


    pointerY.set(
      y
    );
  }


  function resetPointer() {
    pointerX.set(0);

    pointerY.set(0);
  }


  return (
    <section
      ref={
        sectionRef
      }

      className="
        about
      "

      onPointerMove={
        handlePointerMove
      }

      onPointerLeave={
        resetPointer
      }
    >

      {/* =================================================
          BACKGROUND ATMOSPHERE
      ================================================= */}

      <motion.div
        className="
          about-cloud
          about-cloud-one
        "

        style={{
          x:
            cloudOneX,

          y:
            cloudOneY,
        }}
      />


      <motion.div
        className="
          about-cloud
          about-cloud-two
        "

        style={{
          x:
            cloudTwoX,

          y:
            cloudTwoY,
        }}
      />


      <motion.div
        className="
          about-cloud
          about-cloud-three
        "

        style={{
          x:
            cloudThreeX,

          y:
            cloudThreeY,
        }}
      />


      <motion.div
        className="
          about-mist
        "

        style={{
          x:
            mistX,
        }}
      />


      <div
        className="
          about-noise
        "

        aria-hidden="true"
      />


      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="
          about-inner
        "
      >

        <div
          className="
            about-header
          "
        >

          <motion.p
            className="
              about-eyebrow
            "

            initial={{
              opacity:
                0,

              y:
                14,
            }}

            whileInView={{
              opacity:
                1,

              y:
                0,
            }}

            viewport={{
              once:
                true,

              amount:
                0.6,
            }}

            transition={{
              duration:
                0.8,

              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >
            a little context, maybe
          </motion.p>


          <motion.span
            className="
              about-index
            "

            initial={{
              opacity:
                0,
            }}

            whileInView={{
              opacity:
                1,
            }}

            viewport={{
              once:
                true,
            }}

            transition={{
              delay:
                0.25,

              duration:
                0.9,
            }}
          >
            
          </motion.span>

        </div>


        <div
          className="
            about-lines
          "

          onMouseLeave={() => {
            if (
              !isMobile
            ) {
              setDesktopActive(
                null
              );
            }
          }}
        >

          {
            lines.map(
              (
                item,
                index
              ) => (

                <AboutLine
                  key={
                    item.text
                  }

                  item={
                    item
                  }

                  index={
                    index
                  }

                  isMobile={
                    isMobile
                  }

                  desktopActive={
                    desktopActive
                  }

                  setDesktopActive={
                    setDesktopActive
                  }

                  mobileActive={
                    mobileActive
                  }

                  setMobileActive={
                    setMobileActive
                  }
                />

              )
            )
          }

        </div>


        <motion.p
          className="
            about-footnote
          "

          initial={{
            opacity:
              0,

            y:
              10,
          }}

          whileInView={{
            opacity:
              1,

            y:
              0,
          }}

          viewport={{
            once:
              true,
          }}

          transition={{
            delay:
              0.15,

            duration:
              1,

            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          }}
        >
          between making &amp; feeling
        </motion.p>

      </div>

    </section>
  );
}