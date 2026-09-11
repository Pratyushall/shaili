"use client";

import { motion } from "motion/react";
import { useState } from "react";

const lines = [
  "I built websites for love more than survival.",
  "I take pictures to feed my soul.",
  "I collect quotes for truths I keep forgetting.",
];

export default function About() {
  const [activeLine, setActiveLine] = useState(null);

  return (
    <section className="about">
      {/* BACKGROUND TEXTURES */}
      <div className="about-cloud about-cloud-one" />
      <div className="about-cloud about-cloud-two" />
      <div className="about-cloud about-cloud-three" />
      <div className="about-noise" />

      {/* CONTENT */}
      <div className="about-inner">
        <motion.p
          className="about-eyebrow"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          a little context, maybe
        </motion.p>

        <div
          className="about-lines"
          onMouseLeave={() => setActiveLine(null)}
        >
          {lines.map((line, index) => {
            const isActive = activeLine === index;
            const hasActiveLine = activeLine !== null;

            return (
              <motion.p
                key={line}
                className="about-line"
                onMouseEnter={() => setActiveLine(index)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.5,
                }}
                animate={{
                  scale: isActive
                    ? 1.1
                    : hasActiveLine
                    ? 0.78
                    : 1,

                  opacity:
                    hasActiveLine && !isActive
                      ? 0.32
                      : 1,

                  x: isActive ? 25 : 0,
                }}
                transition={{
                  scale: {
                    type: "spring",
                    stiffness: 150,
                    damping: 18,
                    mass: 0.85,
                  },

                  opacity: {
                    duration: 0.35,
                  },

                  x: {
                    type: "spring",
                    stiffness: 150,
                    damping: 18,
                  },

                  y: {
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
              >
                {line}
              </motion.p>
            );
          })}
        </div>

        <motion.p
          className="about-footnote"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            duration: 1,
          }}
        >
       
        </motion.p>
      </div>
    </section>
  );
}