"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

const projects = [
  {
    number: "01",
    name: "Lusso Interiors",
    url: "https://lussointeriors.in",
    image: "/images/projects/lusso.jpg",
    position: "project-one",
    rotation: -4,
  },
  {
    number: "02",
    name: "Interior Design Calculator",
    url: "https://interiordesigncalculator.com",
    image: "/images/projects/calculator.jpg",
    position: "project-two",
    rotation: 3,
  },
  {
    number: "03",
    name: "Balqony Sitralu",
    url: "https://balqonysitralu.in",
    image: "/images/projects/balqony.jpg",
    position: "project-three",
    rotation: -2,
  },
  {
    number: "04",
    name: "Vama Living",
    url: "https://vamaliving.com",
    image: "/images/projects/vama.jpg",
    position: "project-four",
    rotation: 4,
  },
];

function ProjectCard({
  project,
  index,
  total,
  progress,
  activeProject,
}) {
  const segment = 1 / total;
  const start = index * segment;
  const end = (index + 1) * segment;

  let opacityInput;
  let opacityOutput;

  let yInput;
  let yOutput;

  let scaleInput;
  let scaleOutput;

  let rotateInput;
  let rotateOutput;

  if (index === 0) {
    opacityInput = [0, end - 0.06, end];
    opacityOutput = [1, 1, 0];

    yInput = [0, end - 0.06, end];
    yOutput = [0, 0, -100];

    scaleInput = [0, end - 0.06, end];
    scaleOutput = [1, 1, 0.92];

    rotateInput = [0, end];
    rotateOutput = [project.rotation, project.rotation - 3];
  } else if (index === total - 1) {
    opacityInput = [start - 0.06, start + 0.025, 1];
    opacityOutput = [0, 1, 1];

    yInput = [start - 0.06, start + 0.025, 1];
    yOutput = [130, 0, 0];

    scaleInput = [start - 0.06, start + 0.025, 1];
    scaleOutput = [0.86, 1, 1];

    rotateInput = [start - 0.06, start + 0.025, 1];
    rotateOutput = [
      project.rotation + 5,
      project.rotation,
      project.rotation,
    ];
  } else {
    opacityInput = [
      start - 0.06,
      start + 0.025,
      end - 0.06,
      end,
    ];

    opacityOutput = [0, 1, 1, 0];

    yInput = [
      start - 0.06,
      start + 0.025,
      end - 0.06,
      end,
    ];

    yOutput = [130, 0, 0, -100];

    scaleInput = [
      start - 0.06,
      start + 0.025,
      end - 0.06,
      end,
    ];

    scaleOutput = [0.86, 1, 1, 0.92];

    rotateInput = [
      start - 0.06,
      start + 0.025,
      end - 0.06,
      end,
    ];

    rotateOutput = [
      project.rotation + 5,
      project.rotation,
      project.rotation,
      project.rotation - 3,
    ];
  }

  const opacity = useTransform(
    progress,
    opacityInput,
    opacityOutput
  );

  const y = useTransform(
    progress,
    yInput,
    yOutput
  );

  const scale = useTransform(
    progress,
    scaleInput,
    scaleOutput
  );

  const rotate = useTransform(
    progress,
    rotateInput,
    rotateOutput
  );

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`project-card ${project.position}`}
      style={{
        opacity,
        y,
        scale,
        rotate,
        pointerEvents:
          activeProject === index ? "auto" : "none",
        zIndex: activeProject === index ? 10 : index,
      }}
      whileHover={{
        scale: 1.025,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 20,
      }}
    >
      <div
        className="project-image"
        style={{
          backgroundImage: `url("${project.image}")`,
        }}
      />

      <div className="project-overlay" />

      <span className="project-number">
        {project.number}
      </span>

      <div className="project-info">
        <h2>{project.name}</h2>

        <span className="project-link">
          wander in ↗
        </span>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  const [activeProject, setActiveProject] =
    useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {
      const index = Math.min(
        projects.length - 1,
        Math.floor(latest * projects.length)
      );

      setActiveProject(index);
    }
  );

  return (
    <section
      ref={sectionRef}
      className="projects"
    >
      <div className="projects-sticky">
        <div className="projects-grain" />

        <div className="projects-header">
          <p>things i made</p>

          <span>
            {String(activeProject + 1).padStart(
              2,
              "0"
            )}
            {" / "}
            {String(projects.length).padStart(
              2,
              "0"
            )}
          </span>
        </div>

        <div className="projects-stage">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              total={projects.length}
              progress={scrollYProgress}
              activeProject={activeProject}
            />
          ))}
        </div>

        <p className="projects-scroll">
          keep scrolling ↓
        </p>
      </div>
    </section>
  );
}