"use client";

import {
  useMotionValueEvent,
  useScroll,
} from "motion/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";


/* =========================================================
   DESKTOP — HUMANS
   17 PHOTOS
========================================================= */

const desktopSomeonePhotos = [
  "/images/photos/someone/so1.jpeg",
  "/images/photos/someone/so2.jpeg",
  "/images/photos/someone/so3.jpeg",
  "/images/photos/someone/so4.jpeg",
  "/images/photos/someone/so5.jpeg",
  "/images/photos/someone/so6.jpeg",
  "/images/photos/someone/so7.jpeg",
  "/images/photos/someone/so8.jpeg",
  "/images/photos/someone/so9.jpeg",
  "/images/photos/someone/so10.jpeg",
  "/images/photos/someone/so11.jpeg",
  "/images/photos/someone/so12.jpeg",
  "/images/photos/someone/so13.jpeg",
  "/images/photos/someone/so14.jpeg",
  "/images/photos/someone/so15.jpeg",
  "/images/photos/someone/so16.jpeg",
  "/images/photos/someone/so17.jpeg",
];


/* =========================================================
   DESKTOP — NO HUMANS
   15 PHOTOS
========================================================= */

const desktopSomewherePhotos = [
  "/images/photos/somewhere/sw1.jpeg",
  "/images/photos/somewhere/sw2.jpeg",
  "/images/photos/somewhere/sw3.jpeg",
  "/images/photos/somewhere/sw4.jpeg",
  "/images/photos/somewhere/sw5.jpeg",
  "/images/photos/somewhere/sw6.jpeg",
  "/images/photos/somewhere/sw7.jpeg",
  "/images/photos/somewhere/sw8.jpeg",
  "/images/photos/somewhere/sw9.jpeg",
  "/images/photos/somewhere/sw10.jpeg",
  "/images/photos/somewhere/sw11.jpeg",
  "/images/photos/somewhere/sw12.jpeg",
  "/images/photos/somewhere/sw13.jpeg",
  "/images/photos/somewhere/sw14.jpeg",
  "/images/photos/somewhere/sw15.jpeg",
];


/* =========================================================
   MOBILE
   ONE GALLERY
   18 PHOTOS
========================================================= */

const mobilePhotos = [
  "/images/photos/mobile/mb1.jpeg",
  "/images/photos/mobile/mb2.jpeg",
  "/images/photos/mobile/mb3.jpeg",
  "/images/photos/mobile/mb4.jpeg",
  "/images/photos/mobile/mb5.jpeg",
  "/images/photos/mobile/mb6.jpeg",
  "/images/photos/mobile/mb7.jpeg",
  "/images/photos/mobile/mb8.jpeg",
  "/images/photos/mobile/mb9.jpeg",
  "/images/photos/mobile/mb10.jpeg",
  "/images/photos/mobile/mb11.jpeg",
  "/images/photos/mobile/mb12.jpeg",
  "/images/photos/mobile/mb13.jpeg",
  "/images/photos/mobile/mb14.jpeg",
  "/images/photos/mobile/mb15.jpeg",
  "/images/photos/mobile/mb16.jpeg",
  "/images/photos/mobile/mb17.jpeg",
  "/images/photos/mobile/mb18.jpeg",
];


/* =========================================================
   HELPERS
========================================================= */

function clamp(
  value,
  min,
  max
) {
  return Math.min(
    max,
    Math.max(
      min,
      value
    )
  );
}


/* =========================================================
   MOBILE QUERY
========================================================= */

function useIsMobile() {
  const [
    isMobile,
    setIsMobile,
  ] = useState(false);


  useEffect(() => {
    const query =
      window.matchMedia(
        "(max-width: 800px)"
      );


    function update() {
      setIsMobile(
        query.matches
      );
    }


    update();


    query.addEventListener?.(
      "change",
      update
    );


    return () => {
      query.removeEventListener?.(
        "change",
        update
      );
    };
  }, []);


  return isMobile;
}


/* =========================================================
   IMAGE NATURAL SIZE
========================================================= */

function useNaturalImageSize(
  src
) {
  const [
    imageSize,
    setImageSize,
  ] = useState({
    width: 0,
    height: 0,
  });


  useEffect(() => {
    let cancelled =
      false;


    const image =
      new Image();


    image.onload = () => {
      if (
        cancelled
      ) {
        return;
      }


      setImageSize({
        width:
          image.naturalWidth ||
          image.width ||
          1,

        height:
          image.naturalHeight ||
          image.height ||
          1,
      });
    };


    image.src =
      src;


    return () => {
      cancelled =
        true;
    };
  }, [
    src,
  ]);


  return imageSize;
}


/* =========================================================
   CLEAN MAGNIFYING LENS

   SAME PHOTO.
   ZOOM ONLY.
   NO COLOUR PROCESSING.
========================================================= */

function GlassLens({
  pointer,
  image,
  mode,
  stageSize,
  isMobile,
}) {
  const imageSize =
    useNaturalImageSize(
      image
    );


  if (
    !pointer.visible ||
    !stageSize.width ||
    !stageSize.height ||
    !imageSize.width ||
    !imageSize.height
  ) {
    return null;
  }


  /* =======================================================
     SIZE
  ======================================================= */

  const size =
    isMobile

      ? clamp(
          stageSize.width *
            0.68,

          225,

          320
        )

      : clamp(
          stageSize.width *
            0.37,

          410,

          590
        );


  const radius =
    size / 2;


  /* =======================================================
     ZOOM
  ======================================================= */

  const zoom =
    isMobile
      ? 1.8
      : 2.05;


  /* =======================================================
     LENS POSITION
  ======================================================= */

  let lensLeft;
  let lensTop;


  if (
    isMobile
  ) {
    lensLeft =
      clamp(
        pointer.x -
          radius,

        8,

        stageSize.width -
          size -
          8
      );


    lensTop =
      clamp(
        pointer.y -
          size -
          42,

        8,

        stageSize.height -
          size -
          8
      );
  }

  else {
    lensLeft =
      pointer.x -
      radius;


    lensTop =
      pointer.y -
      radius;
  }


  /* =======================================================
     RECREATE background-size: cover
  ======================================================= */

  const coverScale =
    Math.max(
      stageSize.width /
        imageSize.width,

      stageSize.height /
        imageSize.height
    );


  const baseRenderedWidth =
    imageSize.width *
    coverScale;


  const baseRenderedHeight =
    imageSize.height *
    coverScale;


  const baseOffsetX =
    (
      stageSize.width -
      baseRenderedWidth
    )
    /
    2;


  const baseOffsetY =
    (
      stageSize.height -
      baseRenderedHeight
    )
    /
    2;


  const sourceX =
    (
      pointer.x -
      baseOffsetX
    )
    /
    coverScale;


  const sourceY =
    (
      pointer.y -
      baseOffsetY
    )
    /
    coverScale;


  const magnifiedScale =
    coverScale *
    zoom;


  const magnifiedWidth =
    imageSize.width *
    magnifiedScale;


  const magnifiedHeight =
    imageSize.height *
    magnifiedScale;


  const rawBackgroundX =
    radius -
    sourceX *
      magnifiedScale;


  const rawBackgroundY =
    radius -
    sourceY *
      magnifiedScale;


  const backgroundX =
    clamp(
      rawBackgroundX,

      size -
        magnifiedWidth,

      0
    );


  const backgroundY =
    clamp(
      rawBackgroundY,

      size -
        magnifiedHeight,

      0
    );


  return (
    <div
      className={`
        photo-lens
        photo-lens-${mode}

        ${
          isMobile
            ? "photo-lens-mobile"
            : ""
        }
      `}

      style={{
        width:
          size,

        height:
          size,

        left:
          lensLeft,

        top:
          lensTop,
      }}

      aria-hidden="true"
    >

      <div
        className="
          photo-lens-image
        "

        style={{
          backgroundImage:
            `url("${image}")`,

          backgroundRepeat:
            "no-repeat",

          backgroundSize:
            `${magnifiedWidth}px ${magnifiedHeight}px`,

          backgroundPosition:
            `${backgroundX}px ${backgroundY}px`,
        }}
      />


      <div
        className="
          photo-lens-edge-light
        "
      />


      <div
        className="
          photo-lens-gloss
        "
      />


      <div
        className="
          photo-lens-hotspot
        "
      />


      <div
        className="
          photo-lens-rim
        "
      />

    </div>
  );
}


/* =========================================================
   PHOTO GALLERY
========================================================= */

function PhotoGallery() {
  const isMobile =
    useIsMobile();


  const storyRef =
    useRef(null);


  const stageRef =
    useRef(null);


  const [
    mode,
    setMode,
  ] = useState(
    "someone"
  );


  const [
    index,
    setIndex,
  ] = useState(0);


  const [
    introReveal,
    setIntroReveal,
  ] = useState(0);


  const [
    pointer,
    setPointer,
  ] = useState({
    x: 0,
    y: 0,
    visible: false,
  });


  const [
    stageSize,
    setStageSize,
  ] = useState({
    width: 0,
    height: 0,
  });


  /* =======================================================
     ACTIVE PHOTOS
  ======================================================= */

  const activePhotos =
    isMobile

      ? mobilePhotos

      : mode === "someone"
        ? desktopSomeonePhotos
        : desktopSomewherePhotos;


  const title =
    mode === "someone"
      ? "HUMANS"
      : "NO HUMANS";


  const currentImage =
    activePhotos[index];


  /* =======================================================
     RESET ON BREAKPOINT CHANGE
  ======================================================= */

  useEffect(() => {
    setIndex(0);

    setIntroReveal(0);

    setPointer({
      x: 0,
      y: 0,
      visible: false,
    });
  }, [
    isMobile,
  ]);


  /* =======================================================
     DESKTOP INTRO SCROLL
  ======================================================= */

  const {
    scrollYProgress,
  } = useScroll({
    target:
      storyRef,

    offset: [
      "start start",
      "end end",
    ],
  });


  useMotionValueEvent(
    scrollYProgress,

    "change",

    (
      progress
    ) => {
      if (
        isMobile
      ) {
        return;
      }


      const reveal =
        clamp(
          progress *
            1.45,

          0,

          1
        );


      setIntroReveal(
        reveal
      );
    }
  );


  /* =======================================================
     FIRST PHOTO
  ======================================================= */

  const firstPhoto =
    index === 0;


  const effectiveReveal =
    isMobile

      ? 1

      : firstPhoto
        ? introReveal
        : 1;


  const openingScale =
    1 +
    (
      1 -
      effectiveReveal
    )
    *
    0.065;


  const openingBlur =
    (
      1 -
      effectiveReveal
    )
    *
    28;


  const openingTitleOpacity =
    !isMobile &&
    firstPhoto

      ? clamp(
          1 -
          effectiveReveal *
            1.25,

          0,

          1
        )

      : 0;


  const openingTitleScale =
    1 +
    effectiveReveal *
      0.06;


  /* =======================================================
     SELECT CATEGORY
  ======================================================= */

  function selectMode(
    nextMode
  ) {
    if (
      isMobile ||
      nextMode ===
        mode
    ) {
      return;
    }


    setMode(
      nextMode
    );


    setIndex(0);


    setIntroReveal(0);


    setPointer({
      x: 0,
      y: 0,
      visible: false,
    });


    requestAnimationFrame(
      () => {
        storyRef.current
          ?.scrollIntoView({
            behavior:
              "auto",

            block:
              "start",
          });
      }
    );
  }


  /* =======================================================
     PREVIOUS
  ======================================================= */

  function goPrevious() {
    setIndex(
      (
        current
      ) =>
        (
          current -
          1 +
          activePhotos.length
        )
        %
        activePhotos.length
    );


    setPointer(
      (
        previous
      ) => ({
        ...previous,

        visible:
          false,
      })
    );
  }


  /* =======================================================
     NEXT
  ======================================================= */

  function goNext() {
    setIndex(
      (
        current
      ) =>
        (
          current +
          1
        )
        %
        activePhotos.length
    );


    setPointer(
      (
        previous
      ) => ({
        ...previous,

        visible:
          false,
      })
    );
  }


  /* =======================================================
     KEYBOARD
  ======================================================= */

  useEffect(() => {
    function handleKeyDown(
      event
    ) {
      const target =
        event.target;


      const typing =
        target instanceof
          HTMLElement
        &&
        (
          target.isContentEditable ||
          target.tagName ===
            "INPUT" ||
          target.tagName ===
            "TEXTAREA" ||
          target.tagName ===
            "SELECT"
        );


      if (
        typing
      ) {
        return;
      }


      if (
        event.key ===
        "ArrowLeft"
      ) {
        event.preventDefault();


        setIndex(
          (
            current
          ) =>
            (
              current -
              1 +
              activePhotos.length
            )
            %
            activePhotos.length
        );


        setPointer(
          (
            previous
          ) => ({
            ...previous,

            visible:
              false,
          })
        );
      }


      if (
        event.key ===
        "ArrowRight"
      ) {
        event.preventDefault();


        setIndex(
          (
            current
          ) =>
            (
              current +
              1
            )
            %
            activePhotos.length
        );


        setPointer(
          (
            previous
          ) => ({
            ...previous,

            visible:
              false,
          })
        );
      }
    }


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    activePhotos.length,
  ]);


  /* =======================================================
     STAGE SIZE
  ======================================================= */

  useEffect(() => {
    if (
      !stageRef.current
    ) {
      return;
    }


    const stage =
      stageRef.current;


    function updateStageSize() {
      const rect =
        stage
          .getBoundingClientRect();


      setStageSize({
        width:
          rect.width,

        height:
          rect.height,
      });
    }


    updateStageSize();


    const observer =
      new ResizeObserver(
        updateStageSize
      );


    observer.observe(
      stage
    );


    return () => {
      observer.disconnect();
    };
  }, [
    isMobile,
  ]);


  /* =======================================================
     POINTER
  ======================================================= */

  function getPointerPosition(
    event
  ) {
    if (
      !stageRef.current
    ) {
      return null;
    }


    const rect =
      stageRef.current
        .getBoundingClientRect();


    return {
      x:
        clamp(
          event.clientX -
            rect.left,

          0,

          rect.width
        ),

      y:
        clamp(
          event.clientY -
            rect.top,

          0,

          rect.height
        ),
    };
  }


  function showLensAtPointer(
    event
  ) {
    if (
      !isMobile &&
      event.pointerType ===
        "mouse" &&
      event.buttons > 1
    ) {
      return;
    }


    const position =
      getPointerPosition(
        event
      );


    if (
      !position
    ) {
      return;
    }


    setPointer({
      x:
        position.x,

      y:
        position.y,

      visible:
        true,
    });
  }


  function hideMobileLens() {
    if (
      !isMobile
    ) {
      return;
    }


    setPointer(
      (
        previous
      ) => ({
        ...previous,

        visible:
          false,
      })
    );
  }


  const lensAllowed =
    isMobile ||
    !firstPhoto ||
    effectiveReveal >
      0.98;


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      className={`
        photo-gallery

        ${
          isMobile
            ? "photo-gallery-mobile"
            : "photo-gallery-desktop"
        }
      `}

      aria-label="
        Photography
      "
    >

      {/* =================================================
          DESKTOP TABS
      ================================================= */}

      {!isMobile && (

        <div
          className="
            photo-tabs
          "

          role="tablist"

          aria-label="
            Photography categories
          "
        >

          <button
            type="button"

            role="tab"

            aria-selected={
              mode ===
              "someone"
            }

            className={`
              photo-tab

              ${
                mode ===
                "someone"
                  ? "photo-tab-active"
                  : ""
              }
            `}

            onClick={() =>
              selectMode(
                "someone"
              )
            }
          >
            SOMEONE
          </button>


          <button
            type="button"

            role="tab"

            aria-selected={
              mode ===
              "somewhere"
            }

            className={`
              photo-tab

              ${
                mode ===
                "somewhere"
                  ? "photo-tab-active"
                  : ""
              }
            `}

            onClick={() =>
              selectMode(
                "somewhere"
              )
            }
          >
            SOMEWHERE
          </button>

        </div>

      )}


      {/* =================================================
          GALLERY
      ================================================= */}

      <div
        ref={
          storyRef
        }

        className="
          photo-scroll-story
        "
      >

        <div
          ref={
            stageRef
          }

          className="
            photo-stage
            photo-stage-sticky
          "

          onPointerEnter={
            isMobile
              ? undefined
              : showLensAtPointer
          }

          onPointerMove={
            showLensAtPointer
          }

          onPointerDown={
            showLensAtPointer
          }

          onPointerUp={
            hideMobileLens
          }

          onPointerCancel={
            hideMobileLens
          }

          onPointerLeave={() => {
            setPointer(
              (
                previous
              ) => ({
                ...previous,

                visible:
                  false,
              })
            );
          }}
        >

          {/* =============================================
              PHOTO
          ============================================= */}

          <div
            key={
              `${
                isMobile
                  ? "mobile"
                  : mode
              }-${index}`
            }

            className="
              photo-slide
              photo-slide-arrow-enter
            "

            style={{
              filter:
                `blur(${openingBlur}px)`,

              transform:
                `scale(${openingScale})`,
            }}
          >

            <div
              className="
                photo-image
              "

              style={{
                backgroundImage:
                  `url("${currentImage}")`,
              }}
            />

          </div>


          {/* =============================================
              DESKTOP OPENING TITLE
          ============================================= */}

          {!isMobile && (

            <div
              className="
                photo-category-opening
              "

              style={{
                opacity:
                  openingTitleOpacity,

                transform:
                  `scale(${openingTitleScale})`,
              }}
            >
              {title}
            </div>

          )}


          {/* =============================================
              PREVIOUS
          ============================================= */}

          <button
            type="button"

            className="
              photo-arrow
              photo-arrow-left
            "

            aria-label="
              Previous photograph
            "

            onPointerDown={
              (
                event
              ) =>
                event.stopPropagation()
            }

            onClick={
              goPrevious
            }
          >
            <span
              aria-hidden="true"
            >
              ←
            </span>
          </button>


          {/* =============================================
              NEXT
          ============================================= */}

          <button
            type="button"

            className="
              photo-arrow
              photo-arrow-right
            "

            aria-label="
              Next photograph
            "

            onPointerDown={
              (
                event
              ) =>
                event.stopPropagation()
            }

            onClick={
              goNext
            }
          >
            <span
              aria-hidden="true"
            >
              →
            </span>
          </button>


          {/* =============================================
              CLEAN LENS
          ============================================= */}

          {lensAllowed && (

            <GlassLens
              pointer={
                pointer
              }

              image={
                currentImage
              }

              mode={
                isMobile
                  ? "mobile"
                  : mode
              }

              stageSize={
                stageSize
              }

              isMobile={
                isMobile
              }
            />

          )}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   MAIN
========================================================= */

export default function Photos() {
  return (
    <section
      className="
        photos
      "
    >
      <PhotoGallery />
    </section>
  );
}