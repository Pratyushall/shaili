"use client";

import { motion } from "motion/react";
import { useState } from "react";

const BLINDS = 16;

const nameLetters = [
  { char: "P", x: -20, y: 12, r: -5 },
  { char: "R", x: 8, y: -18, r: 3 },
  { char: "A", x: -5, y: 14, r: -2 },
  { char: "T", x: 15, y: -8, r: 4 },
  { char: "Y", x: -10, y: 4, r: -3 },
  { char: "U", x: 8, y: 14, r: 2 },
  { char: "S", x: -6, y: -13, r: -4 },
  { char: "H", x: 13, y: 6, r: 3 },
  { char: "A", x: -10, y: -4, r: -2 },
];

/*
  Extra movement when hovering the name.
  Intentionally gentle and asymmetrical.
*/
const nameWander = [
  { x: -38, y: -22, r: -8 },
  { x: 24, y: 30, r: 6 },
  { x: -18, y: 34, r: -5 },
  { x: 36, y: -18, r: 7 },
  { x: -28, y: -8, r: -6 },
  { x: 20, y: 27, r: 5 },
  { x: -32, y: -26, r: -7 },
  { x: 28, y: 20, r: 6 },
  { x: -19, y: 30, r: -4 },
];

const phrase = "nothing is never just nothing";

const phraseScatter = [
  [-18, -10, -3],
  [8, 15, 2],
  [-6, -17, -2],
  [19, 5, 3],
  [-14, 12, -3],
  [7, -12, 2],
  [-20, 3, -3],
  [11, 18, 2],
  [-8, -15, -1],
  [16, -5, 3],
  [-12, 11, -2],
  [5, -18, 2],
  [15, 9, 3],
  [-16, -8, -3],
  [8, 14, 2],
  [-5, -13, -2],
  [18, 5, 3],
  [-11, 16, -3],
  [10, -9, 2],
  [-17, 7, -3],
  [4, 17, 1],
  [14, -13, 3],
  [-7, 9, -2],
  [9, -5, 2],
  [-13, -16, -3],
  [16, 12, 3],
  [-8, 6, -2],
  [6, -10, 2],
];

export default function Hero() {
  const [nameHovered, setNameHovered] = useState(false);
  const [phraseHovered, setPhraseHovered] = useState(false);

  return (
    <section className="hero">

      {/* AMARILLO NARANJA REVEAL */}
      <div className="hero-reveal">
        <div className="grain" />
        <div className="light-leak" />

        <div className="hero-content">

          {/* PRATYUSHA */}
          <div
            className="name"
            aria-label="Pratyusha"
            onMouseEnter={() => setNameHovered(true)}
            onMouseLeave={() => setNameHovered(false)}
          >
            {nameLetters.map((letter, i) => {
              const wander = nameWander[i];

              return (
                <motion.span
                  key={i}
                  initial={{
                    opacity: 0,
                    x: letter.x * 4,
                    y: letter.y * 4,
                    rotate: letter.r * 2,
                  }}
                  animate={
                    nameHovered
                      ? {
                          opacity: 1,

                          x: [
                            letter.x,
                            wander.x,
                            letter.x + 8,
                            letter.x,
                          ],

                          y: [
                            letter.y,
                            wander.y,
                            letter.y - 8,
                            letter.y,
                          ],

                          rotate: [
                            letter.r,
                            wander.r,
                            -wander.r / 2,
                            letter.r,
                          ],
                        }
                      : {
                          opacity: 1,
                          x: letter.x,
                          y: letter.y,
                          rotate: letter.r,
                        }
                  }
                  transition={
                    nameHovered
                      ? {
                          duration: 4.5 + i * 0.18,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                      : {
                          delay: 2.15 + i * 0.06,
                          duration: 0.9,
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                >
                  {letter.char}
                </motion.span>
              );
            })}
          </div>

          {/* NOTHING IS NEVER JUST NOTHING */}
          <motion.div
            className="hero-phrase"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 3,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseEnter={() => setPhraseHovered(true)}
            onMouseLeave={() => setPhraseHovered(false)}
          >
            {phrase.split("").map((char, i) => {
              const values = phraseScatter[i % phraseScatter.length];

              return (
                <motion.span
                  key={i}
                  animate={
                    phraseHovered
                      ? {
                          x: [
                            0,
                            values[0],
                            values[0] * -0.45,
                            0,
                          ],
                          y: [
                            0,
                            values[1],
                            values[1] * -0.6,
                            0,
                          ],
                          rotate: [
                            0,
                            values[2],
                            -values[2] / 2,
                            0,
                          ],
                        }
                      : {
                          x: 0,
                          y: 0,
                          rotate: 0,
                        }
                  }
                  transition={
                    phraseHovered
                      ? {
                          duration: 3.7 + (i % 7) * 0.22,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                      : {
                          duration: 0.9,
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              );
            })}
          </motion.div>

        </div>
      </div>

    {/* HORIZONTAL SCRAPBOOK BLINDS */}
<div className="blinds">
  {Array.from({ length: BLINDS }).map((_, i) => (
    <motion.div
      key={i}
      className="blind"
      style={{
        top: `${(i / BLINDS) * 100}%`,
        height: `${100 / BLINDS + 0.2}%`,

        backgroundPosition: `center ${
          (i / (BLINDS - 1)) * 100
        }%`,

        zIndex: BLINDS - i,
      }}
      initial={{
        rotateX: 0,
        opacity: 1,
      }}
      animate={{
        rotateX: -105,
        opacity: 0,
      }}
      transition={{
        delay: 0.8 + i * 0.055,
        duration: 0.9,
        ease: [0.76, 0, 0.24, 1],
      }}
    />
  ))}
</div>

    </section>
  );
}