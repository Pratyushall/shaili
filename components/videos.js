"use client";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";


/* =========================================================
   VIDEOS

   Files live inside:
   public/videos/

   Next serves public/ from "/"
========================================================= */

const videos = [
  {
    src: "/videos/bq1.mp4",
    label: "",
  },
  {
    src: "/videos/bq2.mp4",
    label: "",
  },
  {
    src: "/videos/bq3.mp4",
    label: "",
  },
  {
    src: "/videos/panfico1.mp4",
    label: "",
  },
  {
    src: "/videos/panfico2.mp4",
    label: "",
  },
  {
    src: "/videos/mandira.mp4",
    label: "",
  },
];


/* =========================================================
   ICONS
========================================================= */

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M8 5.5v13l10-6.5-10-6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}


function PauseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M7 5h4v14H7V5Zm6 0h4v14h-4V5Z"
        fill="currentColor"
      />
    </svg>
  );
}


function VolumeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M4 9v6h4l5 4V5L8 9H4Zm11.5 1.2a3 3 0 0 1 0 3.6l1.6 1.2a5 5 0 0 0 0-6l-1.6 1.2Zm2.8-2.1a6.6 6.6 0 0 1 0 7.8l1.6 1.2a8.6 8.6 0 0 0 0-10.2l-1.6 1.2Z"
        fill="currentColor"
      />
    </svg>
  );
}


function MutedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M4 9v6h4l5 4V5L8 9H4Z"
        fill="currentColor"
      />

      <path
        d="m16 9 5 6m0-6-5 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}


function PipIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M3 5h18v14H3V5Zm2 2v10h14V7H5Zm7 5h6v4h-6v-4Z"
        fill="currentColor"
      />
    </svg>
  );
}


function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M6 6 18 18M18 6 6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}


/* =========================================================
   PREVIEW VIDEO CARD

   - autoplay
   - always muted
   - looping
   - pause/play appears on hover
   - tapping card opens dialog
========================================================= */

function VideoCard({
  video,
  index,
  onOpen,
}) {
  const videoRef =
    useRef(null);


  const [
    paused,
    setPaused,
  ] = useState(false);


  /* =======================================================
     AUTOPLAY MUTED
  ======================================================= */

  useEffect(() => {
    const element =
      videoRef.current;


    if (!element) {
      return;
    }


    element.muted =
      true;

    element.defaultMuted =
      true;


    const playPromise =
      element.play();


    playPromise?.catch(() => {
      setPaused(true);
    });
  }, []);


  /* =======================================================
     PLAY / PAUSE

     Preview ALWAYS remains muted.
  ======================================================= */

  async function togglePlayback(
    event
  ) {
    event.stopPropagation();


    const element =
      videoRef.current;


    if (!element) {
      return;
    }


    element.muted =
      true;


    if (element.paused) {
      try {
        await element.play();

        setPaused(false);
      }

      catch {
        setPaused(true);
      }
    }

    else {
      element.pause();

      setPaused(true);
    }
  }


  /* =======================================================
     KEYBOARD
  ======================================================= */

  function handleKeyDown(
    event
  ) {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      onOpen(index);
    }
  }


  return (
    <motion.article
      className="video-card"

      role="button"

      tabIndex={0}

      aria-label={`Open ${video.label}`}

      initial={{
        opacity: 0,
        y: 40,
        scale: 0.985,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}

      viewport={{
        once: true,
        amount: 0.18,
      }}

      transition={{
        delay:
          index * 0.065,

        duration:
          0.85,

        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}

      onClick={() =>
        onOpen(index)
      }

      onKeyDown={
        handleKeyDown
      }
    >
      {/* ===============================================
          BLUE HOVER AURA
      =============================================== */}

      <div
        className="video-card-aura"
        aria-hidden="true"
      />


      {/* ===============================================
          VIDEO
      =============================================== */}

      <video
        ref={videoRef}

        className="video-preview"

        src={video.src}

        muted

        loop

        autoPlay

        playsInline

        preload="metadata"

        onPlay={() =>
          setPaused(false)
        }

        onPause={() =>
          setPaused(true)
        }
      />


      {/* ===============================================
          GLASS / CINEMATIC WASH
      =============================================== */}

      <div
        className="video-card-vignette"
        aria-hidden="true"
      />


      <div
        className="video-card-glass"
        aria-hidden="true"
      />


      {/* ===============================================
          TOP META
      =============================================== */}

      <div
        className="video-card-meta"
      >
        <span
          className="video-card-index"
        >
          {String(
            index + 1
          ).padStart(
            2,
            "0"
          )}
        </span>

        <span
          className="video-card-label"
        >
          {video.label}
        </span>
      </div>


      {/* ===============================================
          PAUSE / PLAY

          Desktop:
          appears on hover

          Touch:
          stays softly visible
      =============================================== */}

      <div
        className="video-card-controls"
      >
        <button
          type="button"

          className="
            video-glass-button
            video-card-control
          "

          aria-label={
            paused
              ? "Play preview"
              : "Pause preview"
          }

          onClick={
            togglePlayback
          }
        >
          {
            paused
              ? <PlayIcon />
              : <PauseIcon />
          }
        </button>
      </div>


      {/* ===============================================
          OPEN HINT
      =============================================== */}

      <div
        className="video-open-hint"
        aria-hidden="true"
      >
        <span>
          open film
        </span>

        <i>
          ↗
        </i>
      </div>

    </motion.article>
  );
}


/* =========================================================
   VIDEO DIALOG

   KEPT FUNCTIONALLY THE SAME
========================================================= */

function VideoDialog({
  src,
  open,
  onClose,
}) {
  const videoRef =
    useRef(null);


  const [
    paused,
    setPaused,
  ] = useState(false);


  const [
    muted,
    setMuted,
  ] = useState(true);


  const [
    volume,
    setVolume,
  ] = useState(0.75);


  const [
    pipAvailable,
    setPipAvailable,
  ] = useState(false);


  /* =======================================================
     OPEN / CLOSE
  ======================================================= */

  useEffect(() => {
    if (!open) {
      return;
    }


    const oldOverflow =
      document.body.style.overflow;


    document.body.style.overflow =
      "hidden";


    function handleKeyDown(
      event
    ) {
      if (
        event.key ===
        "Escape"
      ) {
        onClose();
      }
    }


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {
      document.body.style.overflow =
        oldOverflow;


      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    open,
    onClose,
  ]);


  /* =======================================================
     SETUP VIDEO
  ======================================================= */

  useEffect(() => {
    if (
      !open ||
      !videoRef.current
    ) {
      return;
    }


    const video =
      videoRef.current;


    video.muted =
      true;


    video.volume =
      volume;


    setMuted(true);


    const standardPip =
      Boolean(
        document.pictureInPictureEnabled &&
        video.requestPictureInPicture
      );


    const safariPip =
      Boolean(
        video.webkitSupportsPresentationMode &&
        video.webkitSetPresentationMode
      );


    setPipAvailable(
      standardPip ||
      safariPip
    );


    video
      .play()
      .catch(() => {
        setPaused(true);
      });

  }, [
    open,
    src,
  ]);


  /* =======================================================
     PLAY / PAUSE
  ======================================================= */

  async function togglePlayback() {
    const video =
      videoRef.current;


    if (!video) {
      return;
    }


    if (video.paused) {
      try {
        await video.play();

        setPaused(false);
      }

      catch {
        // blocked
      }
    }

    else {
      video.pause();

      setPaused(true);
    }
  }


  /* =======================================================
     MUTE
  ======================================================= */

  function toggleMute() {
    const video =
      videoRef.current;


    if (!video) {
      return;
    }


    const nextMuted =
      !video.muted;


    video.muted =
      nextMuted;


    if (
      !nextMuted &&
      video.volume === 0
    ) {
      video.volume =
        0.75;

      setVolume(
        0.75
      );
    }


    setMuted(
      nextMuted
    );
  }


  /* =======================================================
     VOLUME
  ======================================================= */

  function handleVolumeChange(
    event
  ) {
    const nextVolume =
      Number(
        event.target.value
      );


    const video =
      videoRef.current;


    if (!video) {
      return;
    }


    video.volume =
      nextVolume;


    setVolume(
      nextVolume
    );


    if (
      nextVolume >
      0
    ) {
      video.muted =
        false;

      setMuted(false);
    }

    else {
      video.muted =
        true;

      setMuted(true);
    }
  }


  /* =======================================================
     PICTURE IN PICTURE
  ======================================================= */

  async function togglePictureInPicture() {
    const video =
      videoRef.current;


    if (!video) {
      return;
    }


    if (
      document.pictureInPictureEnabled &&
      video.requestPictureInPicture
    ) {
      try {
        if (
          document.pictureInPictureElement
        ) {
          await document
            .exitPictureInPicture();
        }

        else {
          await video
            .requestPictureInPicture();
        }
      }

      catch {
        // browser rejected PiP
      }


      return;
    }


    if (
      video.webkitSupportsPresentationMode?.(
        "picture-in-picture"
      )
    ) {
      const nextMode =
        video.webkitPresentationMode ===
        "picture-in-picture"
          ? "inline"
          : "picture-in-picture";


      video.webkitSetPresentationMode(
        nextMode
      );
    }
  }


  return (
    <AnimatePresence>
      {
        open && (
          <motion.div
            className="video-dialog-backdrop"

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            transition={{
              duration: 0.28,
            }}

            onMouseDown={(
              event
            ) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                onClose();
              }
            }}
          >
            <motion.div
              className="video-dialog"

              role="dialog"

              aria-modal="true"

              aria-label="Video player"

              initial={{
                opacity: 0,
                scale: 0.94,
                y: 28,
              }}

              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                scale: 0.95,
                y: 18,
              }}

              transition={{
                duration: 0.42,

                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
            >

              {/* CLOSE */}

              <button
                type="button"

                className="
                  video-glass-button
                  video-dialog-close
                "

                aria-label="Close video"

                onClick={
                  onClose
                }
              >
                <CloseIcon />
              </button>


              {/* VIDEO */}

              <video
                key={
                  src
                }

                ref={
                  videoRef
                }

                className="video-dialog-media"

                src={
                  src
                }

                muted

                autoPlay

                loop

                playsInline

                preload="auto"

                onPlay={() =>
                  setPaused(false)
                }

                onPause={() =>
                  setPaused(true)
                }
              />


              {/* BOTTOM CONTROLS */}

              <div
                className="video-dialog-controls"
              >

                <button
                  type="button"

                  className="video-glass-button"

                  aria-label={
                    paused
                      ? "Play video"
                      : "Pause video"
                  }

                  onClick={
                    togglePlayback
                  }
                >
                  {
                    paused
                      ? <PlayIcon />
                      : <PauseIcon />
                  }
                </button>


                <button
                  type="button"

                  className="video-glass-button"

                  aria-label={
                    muted
                      ? "Unmute video"
                      : "Mute video"
                  }

                  onClick={
                    toggleMute
                  }
                >
                  {
                    muted
                      ? <MutedIcon />
                      : <VolumeIcon />
                  }
                </button>


                <div
                  className="
                    video-volume-control
                    video-glass-panel
                  "
                >
                  <VolumeIcon />

                  <input
                    type="range"

                    min="0"

                    max="1"

                    step="0.01"

                    value={
                      muted
                        ? 0
                        : volume
                    }

                    aria-label="Video volume"

                    onChange={
                      handleVolumeChange
                    }
                  />
                </div>


                {
                  pipAvailable && (
                    <button
                      type="button"

                      className="video-glass-button"

                      aria-label="Picture in picture"

                      onClick={
                        togglePictureInPicture
                      }
                    >
                      <PipIcon />
                    </button>
                  )
                }

              </div>

            </motion.div>
          </motion.div>
        )
      }
    </AnimatePresence>
  );
}


/* =========================================================
   SECTION
========================================================= */

export default function Videos() {
  const [
    activeVideo,
    setActiveVideo,
  ] = useState(null);


  function closeDialog() {
    setActiveVideo(
      null
    );
  }


  return (
    <>
      <section
        className="videos"
      >

        {/* =================================================
            ATMOSPHERE
        ================================================= */}

        <div
          className="
            videos-blue-bloom
            videos-blue-bloom-one
          "
        />

        <div
          className="
            videos-blue-bloom
            videos-blue-bloom-two
          "
        />

        <div
          className="
            videos-blue-bloom
            videos-blue-bloom-three
          "
        />

        <div
          className="videos-light"
        />

        <div
          className="videos-grain"
        />


        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className="videos-inner"
        >

          {/* HEADER */}

          <div
            className="videos-header"
          >
            <div
              className="videos-header-copy"
            >
              <p>
                
              </p>

              <h1>
                films
              </h1>
            </div>

            <div
              className="videos-header-meta"
            >
              <span>
                
              </span>

              <i
                aria-hidden="true"
              />
            </div>
          </div>


          {/* =================================================
              SIX-FILM GRID
          ================================================= */}

          <div
            className="videos-grid"
          >
            {
              videos.map(
                (
                  video,
                  index
                ) => (
                  <VideoCard
                    key={
                      video.src
                    }

                    video={
                      video
                    }

                    index={
                      index
                    }

                    onOpen={
                      setActiveVideo
                    }
                  />
                )
              )
            }
          </div>


          {/* CLOSING NOTE */}

          <div
            className="videos-footer-note"
          >
            <span>
              
            </span>

            <span>
              click to watch
            </span>
          </div>

        </div>

      </section>


      {/* =====================================================
          EXISTING DIALOG
      ===================================================== */}

      <VideoDialog
        src={
          activeVideo !== null
            ? videos[
                activeVideo
              ].src
            : ""
        }

        open={
          activeVideo !== null
        }

        onClose={
          closeDialog
        }
      />
    </>
  );
}