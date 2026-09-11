"use client";

import {
  useMotionValueEvent,
  useScroll,
} from "motion/react";

import {
  useRef,
  useState,
} from "react";


/* =========================================================
   10 PHOTOS EACH
========================================================= */

const someonePhotos = [
  "/images/photos/someone/one1.jpeg",
  "/images/photos/someone/one2.jpeg",
  "/images/photos/someone/one3.jpeg",
  "/images/photos/someone/one4.jpeg",
  "/images/photos/someone/one5.jpeg",
  "/images/photos/someone/one6.jpeg",
  "/images/photos/someone/one7.jpeg",
  "/images/photos/someone/one8.jpeg",
  "/images/photos/someone/one9.jpeg",
  "/images/photos/someone/one10.jpeg",
];

const somewherePhotos = [
  "/images/photos/somewhere/where1.jpeg",
  "/images/photos/somewhere/where2.jpeg",
  "/images/photos/somewhere/where3.jpeg",
  "/images/photos/somewhere/where4.jpeg",
  "/images/photos/somewhere/where5.jpeg",
  "/images/photos/somewhere/where6.jpeg",
  "/images/photos/somewhere/where7.jpeg",
  "/images/photos/somewhere/where8.jpeg",
  "/images/photos/somewhere/where9.jpeg",
  "/images/photos/somewhere/where10.jpeg",
];


/* =========================================================
   PHOTO LAYER
   colour + black & white copy
========================================================= */

function PhotoLayer({
  image,
  opacity,
  blur,
  scale,
  slider,
  zIndex,
}) {
  return (
    <div
      className="photo-layer"
      style={{
        opacity,
        filter: `blur(${blur}px)`,
        transform: `scale(${scale})`,
        zIndex,
      }}
    >
      {/* COLOUR IMAGE */}
      <div
        className="photo-image"
        style={{
          backgroundImage: `url("${image}")`,
        }}
      />

      {/* BLACK & WHITE COPY */}
      <div
        className="photo-image photo-image-bw"
        style={{
          backgroundImage: `url("${image}")`,

          /*
            slider = 100 → full colour
            slider = 0   → full black & white
          */
          clipPath: `inset(0 0 0 ${slider}%)`,
        }}
      />
    </div>
  );
}


/* =========================================================
   GLASS BUBBLE
========================================================= */

function GlassLens({
  pointer,
  image,
  mode,
}) {
  const size = 170;
  const radius = size / 2;

  if (!pointer.visible) {
    return null;
  }

  const lensLeft = pointer.x - radius;
  const lensTop = pointer.y - radius;

  const transform =
    mode === "someone"
      ? "rotate(180deg)"
      : "scale(1.7)";

  return (
    <div
      className={`photo-lens photo-lens-${mode}`}
      style={{
        width: size,
        height: size,
        left: lensLeft,
        top: lensTop,
      }}
    >
      <div
        className="photo-lens-image"
        style={{
          width: "100vw",
          height: "100svh",

          left: -lensLeft,
          top: -lensTop,

          backgroundImage: `url("${image}")`,

          transform,
          transformOrigin: `${pointer.x}px ${pointer.y}px`,
        }}
      />

      <div className="photo-lens-shine" />
    </div>
  );
}


/* =========================================================
   ONE PHOTO EXPERIENCE
========================================================= */

function PhotoStory({
  id,
  photos,
  title,
  mode,
}) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);

  const [frame, setFrame] = useState({
    index: 0,
    mix: 0,
  });

  const [slider, setSlider] = useState(92);
  const [dragging, setDragging] = useState(false);

  const [pointer, setPointer] = useState({
    x: 0,
    y: 0,
    visible: false,
  });


  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });


  useMotionValueEvent(
    scrollYProgress,
    "change",
    (progress) => {
      const raw =
        progress * (photos.length - 1);

      const index = Math.min(
        photos.length - 1,
        Math.floor(raw)
      );

      const mix =
        index === photos.length - 1
          ? 0
          : raw - index;

      setFrame({
        index,
        mix,
      });
    }
  );


  /* =======================================================
     CURRENT + NEXT PHOTO
  ======================================================= */

  const currentImage =
    photos[frame.index];

  const nextImage =
    photos[
      Math.min(
        frame.index + 1,
        photos.length - 1
      )
    ];


  /* =======================================================
     BLUR / CROSSFADE
  ======================================================= */

  const currentOpacity =
    frame.index === photos.length - 1
      ? 1
      : 1 - frame.mix;

  const nextOpacity =
    frame.index === photos.length - 1
      ? 0
      : frame.mix;


  const currentBlur =
    frame.mix * 18;

  const nextBlur =
    (1 - frame.mix) * 18;


  const currentScale =
    1 + frame.mix * 0.035;

  const nextScale =
    1.035 - frame.mix * 0.035;


  /* =======================================================
     BUBBLE IMAGE
  ======================================================= */

  const lensImage =
    frame.mix > 0.5
      ? nextImage
      : currentImage;


  /* =======================================================
     BUBBLE CURSOR MOVEMENT
  ======================================================= */

  function handlePointerMove(event) {
    if (!viewportRef.current) return;

    const rect =
      viewportRef.current.getBoundingClientRect();

    setPointer({
      x:
        event.clientX -
        rect.left,

      y:
        event.clientY -
        rect.top,

      visible: true,
    });
  }


  /* =======================================================
     BLACK & WHITE SLIDER
  ======================================================= */

  function updateSlider(event) {
    if (!viewportRef.current) return;

    const rect =
      viewportRef.current.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left;

    let percentage =
      (x / rect.width) * 100;

    percentage =
      Math.max(
        0,
        Math.min(100, percentage)
      );

    setSlider(percentage);
  }


  function startSlider(event) {
    setDragging(true);

    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    updateSlider(event);
  }


  function moveSlider(event) {
    if (!dragging) return;

    updateSlider(event);
  }


  function stopSlider(event) {
    setDragging(false);

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    } catch {
      // nothing
    }
  }


  return (
    <section
      id={id}
      ref={sectionRef}
      className={`photo-story photo-story-${mode}`}

      /*
        10 photos × 65svh
        = 650svh scroll journey per category
      */
      style={{
        height: `${photos.length * 65}svh`,
      }}
    >
      <div
        ref={viewportRef}
        className="photo-viewport"

        onPointerMove={handlePointerMove}

        onPointerEnter={
          handlePointerMove
        }

        onPointerLeave={() =>
          setPointer((previous) => ({
            ...previous,
            visible: false,
          }))
        }
      >

        {/* =================================================
            CURRENT PHOTO
        ================================================= */}

        <PhotoLayer
          image={currentImage}
          opacity={currentOpacity}
          blur={currentBlur}
          scale={currentScale}
          slider={slider}
          zIndex={1}
        />


        {/* =================================================
            NEXT PHOTO
        ================================================= */}

        <PhotoLayer
          image={nextImage}
          opacity={nextOpacity}
          blur={nextBlur}
          scale={nextScale}
          slider={slider}
          zIndex={2}
        />


        {/* =================================================
            CINEMATIC VIGNETTE
        ================================================= */}

        <div className="photo-vignette" />


        {/* =================================================
            HUMANS | NO HUMANS
        ================================================= */}

        <nav className="photo-nav">

          <a
            href="#humans"
            className={
              mode === "someone"
                ? "photo-nav-active"
                : ""
            }
          >
            HUMANS
          </a>

          <span>|</span>

          <a
            href="#no-humans"
            className={
              mode === "somewhere"
                ? "photo-nav-active"
                : ""
            }
          >
            NO HUMANS
          </a>

        </nav>


        {/* =================================================
            COUNTER
        ================================================= */}

        <div className="photo-counter">

          {String(
            frame.index + 1
          ).padStart(
            2,
            "0"
          )}

          <span>/</span>

          {String(
            photos.length
          ).padStart(
            2,
            "0"
          )}

        </div>


        {/* =================================================
            SOMEONE / SOMEWHERE
        ================================================= */}

        <h2 className="photo-story-title">
          {title}
        </h2>


        {/* =================================================
            BLACK & WHITE DIVIDER
        ================================================= */}

        <div
          className="bw-divider"
          style={{
            left: `${slider}%`,
          }}
        />


        {/* =================================================
            SLIDER HANDLE
        ================================================= */}

        <div
          className={`bw-handle ${
            dragging
              ? "bw-handle-dragging"
              : ""
          }`}

          style={{
            left: `clamp(
              22px,
              ${slider}%,
              calc(100% - 22px)
            )`,
          }}

          onPointerDown={
            startSlider
          }

          onPointerMove={
            moveSlider
          }

          onPointerUp={
            stopSlider
          }

          onPointerCancel={
            stopSlider
          }
        >

          <div className="bw-handle-circle">
            <span>↔</span>
          </div>

        </div>


        {/* =================================================
            LABELS
        ================================================= */}

        <div className="photo-colour-label">
          colour
        </div>

        <div className="photo-bw-label">
          b&w
        </div>


        {/* =================================================
            GLASS BUBBLE
        ================================================= */}

        <GlassLens
          pointer={pointer}
          image={lensImage}
          mode={mode}
        />


        {/* =================================================
            FILM GRAIN
        ================================================= */}

        <div className="photo-grain" />

      </div>
    </section>
  );
}


/* =========================================================
   MAIN PHOTOGRAPHY SECTION
========================================================= */

export default function Photos() {
  return (
    <section className="photos">

      {/* SOMEONE / HUMANS */}

      <PhotoStory
        id="humans"
        photos={someonePhotos}
        title="SOMEONE"
        mode="someone"
      />


      {/* SOMEWHERE / NO HUMANS */}

      <PhotoStory
        id="no-humans"
        photos={somewherePhotos}
        title="SOMEWHERE"
        mode="somewhere"
      />

    </section>
  );
}