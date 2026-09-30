"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";


/* =========================================================
   PROJECTS
========================================================= */

const projects = [
  {
    number: "01",
    name: "Lusso Interiors",
    url: "https://lussointeriors.in",
    image: "/images/lusso.png",
    rotation: -3.5,
  },
  {
    number: "02",
    name: "Interior Design Calculator",
    url: "https://interiordesigncalculator.com",
    image: "/images/calc.png",
    rotation: 2.5,
  },
  {
    number: "03",
    name: "Balqony Sitralu",
    url: "https://balqonysitralu.in",
    image: "/images/bq.png",
    rotation: -2,
  },
  {
    number: "04",
    name: "Vama Living",
    url: "https://vamaliving.com",
    image: "/images/vama.png",
    rotation: 3.5,
  },
];


const TAU =
  Math.PI * 2;


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
          window.innerWidth <= 700,
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
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  index,
  total,
  progress,
  activeProject,
  viewport,
}) {
  const {
    width,
    height,
    mobile,
  } = viewport;


  /*
    Four cards begin evenly distributed
    around the orbit.
  */

  const baseAngle =
    (
      index /
      total
    )
    *
    TAU;


  /*
    We rotate only enough for:

    01 -> 02 -> 03 -> 04

    We DON'T rotate a full 360 degrees because
    that would bring 01 back to the front
    at the end of the section.
  */

  const orbitDistance =
    TAU *
    (
      (
        total -
        1
      )
      /
      total
    );


  const angle =
    useTransform(
      progress,
      (latest) =>
        baseAngle -
        latest *
        orbitDistance
    );


  /* =======================================================
     ORBIT SIZE
  ======================================================= */

  const radiusX =
    mobile
      ? width * 0.34
      : width * 0.335;


  const radiusY =
    mobile
      ? height * 0.265
      : height * 0.28;


  /* =======================================================
     POSITION
  ======================================================= */

  const x =
    useTransform(
      angle,
      (current) =>
        Math.sin(
          current
        )
        *
        radiusX
    );


  const y =
    useTransform(
      angle,
      (current) =>
        Math.cos(
          current
        )
        *
        radiusY
    );


  /* =======================================================
     DEPTH

     cos(angle):
      1 = front
      0 = side
     -1 = back
  ======================================================= */

  const depth =
    useTransform(
      angle,
      (current) =>
        Math.cos(
          current
        )
    );


  /* =======================================================
     SCALE
  ======================================================= */

  const scale =
    useTransform(
      depth,
      [-1, 0, 1],

      mobile
        ? [0.7, 0.82, 1.02]
        : [0.7, 0.84, 1.045]
    );


  /* =======================================================
     OPACITY
  ======================================================= */

  const opacity =
    useTransform(
      depth,
      [-1, -0.1, 1],
      [0.38, 0.72, 1]
    );


  /* =======================================================
     DEPTH FILTER
  ======================================================= */

  const filter =
    useTransform(
      depth,
      (current) => {
        const normalized =
          (
            current +
            1
          )
          /
          2;


        const blur =
          (
            1 -
            normalized
          )
          *
          1.5;


        const saturation =
          0.74 +
          normalized *
          0.26;


        const brightness =
          0.76 +
          normalized *
          0.24;


        return `
          blur(${blur}px)
          saturate(${saturation})
          brightness(${brightness})
        `;
      }
    );


  /* =======================================================
     ROTATION

     Scrapbook angle while away.

     Front card becomes much straighter.
  ======================================================= */

  const rotate =
    useTransform(
      angle,
      (current) => {
        const currentDepth =
          Math.cos(
            current
          );


        const frontness =
          (
            currentDepth +
            1
          )
          /
          2;


        const scrapbookRotation =
          project.rotation *
          (
            1 -
            frontness *
            0.86
          );


        const orbitalTilt =
          Math.sin(
            current
          )
          *
          2.7;


        return (
          scrapbookRotation +
          orbitalTilt
        );
      }
    );


  /* =======================================================
     STACKING
  ======================================================= */

  const zIndex =
    useTransform(
      depth,
      (current) =>
        Math.round(
          (
            current +
            1
          )
          *
          45
        )
        +
        10
    );


  const isActive =
    activeProject ===
    index;


  return (
    <motion.a
      href={
        project.url
      }

      target="_blank"

      rel="noopener noreferrer"

      aria-label={`Open ${project.name}`}

      className="project-card"

      data-active={
        isActive
          ? "true"
          : "false"
      }

      style={{
        x,
        y,
        scale,
        rotate,
        opacity,
        filter,
        zIndex,

        pointerEvents:
          isActive
            ? "auto"
            : "none",
      }}
    >

      {/* IMAGE */}

      <div
        className="project-image"

        style={{
          backgroundImage:
            `url("${project.image}")`,
        }}
      />


      {/* FILM WASH */}

      <div
        className="project-image-wash"
      />


      {/* NUMBER */}

      <span
        className="project-number"
      >
        {project.number}
      </span>


      {/* PROJECT INFO */}

      <div
        className="project-info"
      >

        <h2>
          {project.name}
        </h2>


        <span
          className="project-link"
        >
          Explore
        </span>

      </div>

    </motion.a>
  );
}


/* =========================================================
   PROJECTS
========================================================= */

export default function Projects() {
  const sectionRef =
    useRef(null);


  const viewport =
    useViewport();


  const [
    activeProject,
    setActiveProject,
  ] = useState(0);


  /* =======================================================
     SCROLL
  ======================================================= */

  const {
    scrollYProgress,
  } = useScroll({
    target:
      sectionRef,

    offset: [
      "start start",
      "end end",
    ],
  });


  /*
    Smooth out wheel / trackpad movement.

    Still 100% controlled by scroll.
  */

  const smoothProgress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 52,
        damping: 20,
        mass: 0.82,
        restDelta: 0.0005,
      }
    );


  /* =======================================================
     ACTIVE PROJECT
  ======================================================= */

  useMotionValueEvent(
    smoothProgress,
    "change",
    (latest) => {
      /*
        0    -> project 01
        .33  -> project 02
        .66  -> project 03
        1    -> project 04
      */

      const index =
        Math.min(
          projects.length -
          1,

          Math.max(
            0,

            Math.round(
              latest *
              (
                projects.length -
                1
              )
            )
          )
        );


      setActiveProject(
        index
      );
    }
  );


  return (
    <section
      ref={
        sectionRef
      }

      className="projects"
    >

      <div
        className="projects-sticky"
      >

        {/* =================================================
            BRIGHT RED FILM FIELD
        ================================================= */}

        <div
          className="projects-red-burn"
        />


        {/* =================================================
            HEAVY FILM GRAIN

            Two layers intentionally.
        ================================================= */}

        <div
          className="
            projects-grain
            projects-grain-heavy
          "
        />

        <div
          className="
            projects-grain
            projects-grain-fine
          "
        />


        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="projects-header"
        >

          <p>
            things i made
          </p>


          <span>
            {String(
              activeProject +
              1
            ).padStart(
              2,
              "0"
            )}

            {" / "}

            {String(
              projects.length
            ).padStart(
              2,
              "0"
            )}
          </span>

        </div>


        {/* =================================================
            ORBIT

            CENTER IS INTENTIONALLY EMPTY.
        ================================================= */}

        <div
          className="projects-stage"
        >

          {
            projects.map(
              (
                project,
                index
              ) => (

                <ProjectCard
                  key={
                    project.name
                  }

                  project={
                    project
                  }

                  index={
                    index
                  }

                  total={
                    projects.length
                  }

                  progress={
                    smoothProgress
                  }

                  activeProject={
                    activeProject
                  }

                  viewport={
                    viewport
                  }
                />

              )
            )
          }

        </div>


        {/* =================================================
            CENTRE MARK

            Very quiet so negative space remains.
        ================================================= */}

        <div
          className="projects-centre-mark"

          aria-hidden="true"
        >
          <span />
        </div>


        {/* =================================================
            SCROLL NOTE
        ================================================= */}

        <p
          className="projects-scroll"
        >
          scroll to orbit ↓
        </p>

      </div>

    </section>
  );
}