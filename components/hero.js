"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";


/* =========================================================
   CONFIG
========================================================= */

const BLINDS = 16;

const NAME = "Pratyusha";

const PHRASE_WORDS = [
  "nothing",
  "is",
  "never",
  "just",
  "nothing",
];


/* =========================================================
   VIEWPORT
========================================================= */

function useViewport() {
  const [viewport, setViewport] =
    useState({
      width: 1440,
      height: 900,
      mobile: false,
    });


  useEffect(() => {
    function update() {
      setViewport({
        width:
          window.innerWidth,

        height:
          window.innerHeight,

        mobile:
          window.innerWidth <=
          700,
      });
    }


    update();


    window.addEventListener(
      "resize",
      update
    );


    return () => {
      window.removeEventListener(
        "resize",
        update
      );
    };
  }, []);


  return viewport;
}


/* =========================================================
   SCATTER TARGET
========================================================= */

function getScatterTarget({
  index,
  total,
  kind,
  viewport,
  pointer,
}) {
  const {
    width,
    height,
    mobile,
  } = viewport;


  const goldenAngle =
    2.399963229728653;


  const angle =
    index *
      goldenAngle +

    (
      kind === "name"
        ? 0.35
        : 0.82
    ) +

    pointer.y *
      0.13 -

    pointer.x *
      0.1;


  const phraseRadiusX =
    Math.min(
      width *
        (
          mobile
            ? 0.15
            : 0.12
        ),

      mobile
        ? 72
        : 145
    );


  const phraseRadiusY =
    Math.min(
      height *
        (
          mobile
            ? 0.09
            : 0.1
        ),

      mobile
        ? 62
        : 92
    );


  const nameRadiusX =
    Math.min(
      width *
        0.035,

      mobile
        ? 25
        : 42
    );


  const nameRadiusY =
    Math.min(
      height *
        0.028,

      mobile
        ? 18
        : 28
    );


  const radiusX =
    kind === "name"
      ? nameRadiusX
      : phraseRadiusX;


  const radiusY =
    kind === "name"
      ? nameRadiusY
      : phraseRadiusY;


  const shortWordMultiplier =
    total <= 2
      ? 1.12
      : 1;


  const variation =
    (
      0.82 +
      (
        (
          index *
          31
        )
        %
        17
      )
      /
      100
    )
    *
    shortWordMultiplier;


  const x =
    Math.cos(
      angle
    )
    *
    radiusX
    *
    variation

    +

    pointer.x *
    radiusX *
    (
      kind === "name"
        ? 0.025
        : 0.055
    );


  const y =
    Math.sin(
      angle
    )
    *
    radiusY
    *
    variation

    +

    pointer.y *
    radiusY *
    (
      kind === "name"
        ? 0.025
        : 0.05
    );


  const rotation =
    Math.sin(
      index *
        1.91 +
      total
    )

    *

    (
      kind === "name"
        ? 4
        : 10
    )

    +

    pointer.x *
    (
      kind === "name"
        ? 1.2
        : 2.5
    );


  const scale =
    kind === "name"

      ? (
          0.99 +
          (
            (
              index *
              7
            )
            %
            4
          )
          /
          100
        )

      : (
          0.97 +
          (
            (
              index *
              11 +
              total
            )
            %
            7
          )
          /
          100
        );


  return {
    x,
    y,
    rotation,
    scale,
  };
}


/* =========================================================
   INDIVIDUAL LETTER
========================================================= */

function ScatterLetter({
  char,
  index,
  total,
  kind,
  active,
  pointer,
  viewport,
  entranceDelay = 0,
}) {
  const reducedMotion =
    useReducedMotion();


  const x =
    useMotionValue(0);

  const y =
    useMotionValue(0);

  const rotation =
    useMotionValue(0);

  const scale =
    useMotionValue(1);


  const spring =
    kind === "phrase"

      ? {
          stiffness: 52,
          damping: 16,
          mass: 0.88,
        }

      : {
          stiffness: 58,
          damping: 19,
          mass: 0.82,
        };


  const smoothX =
    useSpring(
      x,
      spring
    );


  const smoothY =
    useSpring(
      y,
      spring
    );


  const smoothRotation =
    useSpring(
      rotation,
      spring
    );


  const smoothScale =
    useSpring(
      scale,
      spring
    );


  useEffect(() => {
    if (
      reducedMotion
    ) {
      x.set(0);
      y.set(0);
      rotation.set(0);
      scale.set(1);

      return;
    }


    if (
      active
    ) {
      const target =
        getScatterTarget({
          index,
          total,
          kind,
          viewport,
          pointer,
        });


      x.set(
        target.x
      );

      y.set(
        target.y
      );

      rotation.set(
        target.rotation
      );

      scale.set(
        target.scale
      );
    }

    else {
      x.set(0);
      y.set(0);
      rotation.set(0);
      scale.set(1);
    }

  }, [
    active,
    pointer.x,
    pointer.y,
    index,
    total,
    kind,
    viewport,
    reducedMotion,
    x,
    y,
    rotation,
    scale,
  ]);


  return (
    <motion.span
      className={`
        hero-letter
        hero-letter-${kind}
      `}

      data-active={
        active
          ? "true"
          : "false"
      }

      style={{
        x:
          smoothX,

        y:
          smoothY,

        rotate:
          smoothRotation,

        scale:
          smoothScale,
      }}
    >

      <motion.span
        className="
          hero-letter-inner
        "

        initial={{
          opacity: 0,

          y: 10,

          filter:
            "blur(5px)",
        }}

        animate={{
          opacity: 1,

          y: 0,

          filter:
            "blur(0px)",
        }}

        transition={{
          delay:
            entranceDelay,

          duration:
            0.78,

          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        }}
      >

        <span
          className="
            hero-letter-face
          "
        >
          {char}
        </span>

      </motion.span>

    </motion.span>
  );
}


/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const heroRef =
    useRef(null);


  const viewport =
    useViewport();


  const reducedMotion =
    useReducedMotion();


  const [
    nameActive,
    setNameActive,
  ] =
    useState(false);


  const [
    activeWord,
    setActiveWord,
  ] =
    useState(null);


  const [
    pointer,
    setPointer,
  ] =
    useState({
      x: 0,
      y: 0,
    });


  /* =======================================================
     POINTER POSITION
  ======================================================= */

  function updatePointer(
    event
  ) {
    if (
      !heroRef.current
    ) {
      return;
    }


    const rect =
      heroRef.current
        .getBoundingClientRect();


    const localX =
      event.clientX -
      rect.left;


    const localY =
      event.clientY -
      rect.top;


    setPointer({
      x:
        (
          localX /
          rect.width
        )
        *
        2
        -
        1,

      y:
        (
          localY /
          rect.height
        )
        *
        2
        -
        1,
    });
  }


  /* =======================================================
     NAME INTERACTION
  ======================================================= */

  function namePointerEnter(
    event
  ) {
    if (
      event.pointerType ===
      "mouse"
    ) {
      setNameActive(
        true
      );

      updatePointer(
        event
      );
    }
  }


  function namePointerMove(
    event
  ) {
    if (
      nameActive
    ) {
      updatePointer(
        event
      );
    }
  }


  function namePointerDown(
    event
  ) {
    setNameActive(
      true
    );


    updatePointer(
      event
    );


    try {
      event.currentTarget
        .setPointerCapture(
          event.pointerId
        );
    }

    catch {
      // optional
    }
  }


  function namePointerUp(
    event
  ) {
    if (
      event.pointerType !==
      "mouse"
    ) {
      setNameActive(
        false
      );
    }


    try {
      event.currentTarget
        .releasePointerCapture(
          event.pointerId
        );
    }

    catch {
      // already released
    }
  }


  /* =======================================================
     WORD INTERACTION
  ======================================================= */

  function wordPointerEnter(
    event,
    wordIndex
  ) {
    if (
      event.pointerType ===
      "mouse"
    ) {
      setActiveWord(
        wordIndex
      );

      updatePointer(
        event
      );
    }
  }


  function wordPointerMove(
    event,
    wordIndex
  ) {
    if (
      activeWord ===
      wordIndex
    ) {
      updatePointer(
        event
      );
    }
  }


  function wordPointerLeave(
    event,
    wordIndex
  ) {
    if (
      event.pointerType ===
      "mouse"
    ) {
      setActiveWord(
        (current) =>
          current ===
          wordIndex
            ? null
            : current
      );
    }
  }


  function wordPointerDown(
    event,
    wordIndex
  ) {
    setActiveWord(
      wordIndex
    );


    updatePointer(
      event
    );


    try {
      event.currentTarget
        .setPointerCapture(
          event.pointerId
        );
    }

    catch {
      // optional
    }
  }


  function wordPointerUp(
    event,
    wordIndex
  ) {
    if (
      event.pointerType !==
      "mouse"
    ) {
      setActiveWord(
        (current) =>
          current ===
          wordIndex
            ? null
            : current
      );
    }


    try {
      event.currentTarget
        .releasePointerCapture(
          event.pointerId
        );
    }

    catch {
      // already released
    }
  }


  /* =======================================================
     CHARACTER INDEX
  ======================================================= */

  function getPhraseCharacterIndex(
    wordIndex,
    localIndex
  ) {
    let previousCharacters =
      0;


    for (
      let i = 0;
      i < wordIndex;
      i += 1
    ) {
      previousCharacters +=
        PHRASE_WORDS[i].length;
    }


    return (
      previousCharacters +
      localIndex
    );
  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      ref={
        heroRef
      }

      className="
        hero
      "
    >

      {/* =================================================
          IMAGE + NOIR WORLD
      ================================================= */}

      <div
        className="
          hero-reveal
        "
      >

        <div
          className="
            grain
          "
          aria-hidden="true"
        />


        <div
          className="
            light-leak
          "
          aria-hidden="true"
        />


        <div
          className="
            hero-content
          "
        >

          {/* =============================================
              PHRASE
          ============================================= */}

          <div
            className="
              hero-phrase
            "

            aria-label="
              nothing is never just nothing
            "
          >

            {
              PHRASE_WORDS.map(
                (
                  word,
                  wordIndex
                ) => {

                  const wordIsActive =
                    activeWord ===
                    wordIndex;


                  const wordLength =
                    word.length;


                  return (
                    <span
                      className={`
                        phrase-word
                        phrase-word-${wordIndex + 1}
                      `}

                      data-active={
                        wordIsActive
                          ? "true"
                          : "false"
                      }

                      key={
                        `${word}-${wordIndex}`
                      }

                      onPointerEnter={(
                        event
                      ) =>
                        wordPointerEnter(
                          event,
                          wordIndex
                        )
                      }

                      onPointerMove={(
                        event
                      ) =>
                        wordPointerMove(
                          event,
                          wordIndex
                        )
                      }

                      onPointerLeave={(
                        event
                      ) =>
                        wordPointerLeave(
                          event,
                          wordIndex
                        )
                      }

                      onPointerDown={(
                        event
                      ) =>
                        wordPointerDown(
                          event,
                          wordIndex
                        )
                      }

                      onPointerUp={(
                        event
                      ) =>
                        wordPointerUp(
                          event,
                          wordIndex
                        )
                      }

                      onPointerCancel={() =>
                        setActiveWord(
                          null
                        )
                      }
                    >

                      {
                        word
                          .split("")
                          .map(
                            (
                              char,
                              localIndex
                            ) => {

                              const globalIndex =
                                getPhraseCharacterIndex(
                                  wordIndex,
                                  localIndex
                                );


                              return (
                                <ScatterLetter
                                  key={
                                    `${wordIndex}-${localIndex}`
                                  }

                                  char={
                                    char
                                  }

                                  index={
                                    localIndex
                                  }

                                  total={
                                    wordLength
                                  }

                                  kind="
                                    phrase
                                  "

                                  active={
                                    wordIsActive
                                  }

                                  pointer={
                                    pointer
                                  }

                                  viewport={
                                    viewport
                                  }

                                  entranceDelay={
                                    reducedMotion
                                      ? 0
                                      : 1.18 +
                                        globalIndex *
                                        0.022
                                  }
                                />
                              );
                            }
                          )
                      }

                    </span>
                  );
                }
              )
            }

          </div>


          {/* =============================================
              PRATYUSHA
          ============================================= */}

          <div
            className="
              name
            "

            data-active={
              nameActive
                ? "true"
                : "false"
            }

            aria-label="
              Pratyusha
            "

            onPointerEnter={
              namePointerEnter
            }

            onPointerMove={
              namePointerMove
            }

            onPointerDown={
              namePointerDown
            }

            onPointerUp={
              namePointerUp
            }

            onPointerCancel={() =>
              setNameActive(
                false
              )
            }

            onPointerLeave={(
              event
            ) => {
              if (
                event.pointerType ===
                "mouse"
              ) {
                setNameActive(
                  false
                );
              }
            }}
          >

            {
              NAME
                .split("")
                .map(
                  (
                    char,
                    index
                  ) => (

                    <ScatterLetter
                      key={
                        `${char}-${index}`
                      }

                      char={
                        char
                      }

                      index={
                        index
                      }

                      total={
                        NAME.length
                      }

                      kind="
                        name
                      "

                      active={
                        nameActive
                      }

                      pointer={
                        pointer
                      }

                      viewport={
                        viewport
                      }

                      entranceDelay={
                        reducedMotion
                          ? 0
                          : 1 +
                            index *
                            0.045
                      }
                    />

                  )
                )
            }


            <span
              className="
                name-sparkle
                name-sparkle-one
              "

              aria-hidden="true"
            >
              ✦
            </span>


            <span
              className="
                name-sparkle
                name-sparkle-two
              "

              aria-hidden="true"
            >
              ✧
            </span>


            <span
              className="
                name-sparkle
                name-sparkle-three
              "

              aria-hidden="true"
            >
              ·
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          OPENING BLINDS
      ================================================= */}

      <div
        className="
          blinds
        "

        aria-hidden="true"
      >

        {
          Array.from({
            length:
              BLINDS,
          }).map(
            (
              _,
              i
            ) => (

              <motion.div
                key={
                  i
                }

                className="
                  blind
                "

                style={{
                  top:
                    `${(i / BLINDS) * 100}%`,

                  height:
                    `${100 / BLINDS + 0.2}%`,

                  backgroundPosition:
                    `center ${
                      (
                        i /
                        (
                          BLINDS -
                          1
                        )
                      )
                      *
                      100
                    }%`,

                  zIndex:
                    BLINDS -
                    i,
                }}

                initial={
                  reducedMotion
                    ? {
                        opacity:
                          0,
                      }

                    : {
                        rotateX:
                          0,

                        opacity:
                          1,
                      }
                }

                animate={{
                  rotateX:
                    reducedMotion
                      ? 0
                      : -105,

                  opacity:
                    0,
                }}

                transition={{
                  delay:
                    reducedMotion
                      ? 0
                      : 0.42 +
                        i *
                        0.035,

                  duration:
                    reducedMotion
                      ? 0
                      : 0.88,

                  ease: [
                    0.76,
                    0,
                    0.24,
                    1,
                  ],
                }}
              />

            )
          )
        }

      </div>

    </section>
  );
}