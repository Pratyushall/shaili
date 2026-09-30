"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useEffect,
  useState,
} from "react";


/* =========================================================
   EDIT ALL VISIBLE HEADER TEXT HERE
========================================================= */

const HEADER_TEXT = {
  /*
    Tiny glass logo on the left.
    You can make this "p", "P", "*", etc.
  */

  brand: "p",


  /*
    Desktop + mobile navigation labels.
  */

  projects: "Projects",
  photos: "Photos",
  videos: "Videos",


  /*
    Mobile menu small heading.
  */

  mobileHeading: "explore",
  mobileCount: "03 places",


  /*
    Mobile menu bottom note.
  */

  mobileNote:
    "made somewhere between code, film & feeling",
};


/* =========================================================
   EDIT ALL HEADER FONTS HERE

   THIS IS THE MAIN FONT TESTER.

   AVAILABLE FONT NAMES:

   "Header 1942"
   "Header Adventure"
   "Header Blue"
   "Header Coral Pixels"
   "Header Drawn"
   "Header Gridtile"
   "Header Hollow"
   "Header Hooey"
   "Header Hugh Is Life"
   "Header Manasp"
   "Header Midnight Munch"
   "Header Milestone"
   "Header Monashark"
   "Header Mustasurma"
   "Header Punktype"
   "Header Relsika"
   "Header Sans Serif Shaded"
   "Header Saphile Stamp"
   "Header Tracker Clock"
   "Header Xero4"
========================================================= */

const HEADER_FONTS = {
  /*
    LEFT GLASS "p"
  */

  brand:
    '"Header relsika"',


  /*
    DESKTOP:
    Projects / Photos / Videos
  */

  desktopNav:
    '"Header blue"',


  /*
    MOBILE:
    explore / 03 places
  */

  mobileHeading:
    '"Header 1942"',


  /*
    MOBILE:
    Projects / Photos / Videos
  */

  mobileNav:
    '"Header 1942"',


  /*
    MOBILE:
    bottom note
  */

  mobileNote:
    '"Header 1942"',
};


/* =========================================================
   ROUTES

   Change href values here if your routes change.
========================================================= */

const navItems = [
  {
    label:
      HEADER_TEXT.projects,

    href:
      "/projects",
  },

  {
    label:
      HEADER_TEXT.photos,

    href:
      "/photos",
  },

  {
    label:
      HEADER_TEXT.videos,

    href:
      "/videos",
  },
];


/* =========================================================
   HEADER
========================================================= */

export default function Header() {
  const pathname =
    usePathname();


  const [
    scrolled,
    setScrolled,
  ] = useState(false);


  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);


  /* =======================================================
     HEADER SCROLL STATE
  ======================================================= */

  useEffect(() => {
    function update() {
      setScrolled(
        window.scrollY >
          28
      );
    }


    update();


    window.addEventListener(
      "scroll",
      update,
      {
        passive:
          true,
      }
    );


    return () => {
      window.removeEventListener(
        "scroll",
        update
      );
    };
  }, []);


  /* =======================================================
     CLOSE MOBILE MENU ON ROUTE CHANGE
  ======================================================= */

  useEffect(() => {
    setMenuOpen(
      false
    );
  }, [
    pathname,
  ]);


  /* =======================================================
     LOCK BODY WHILE MOBILE MENU IS OPEN
  ======================================================= */

  useEffect(() => {
    if (
      !menuOpen
    ) {
      return;
    }


    const oldOverflow =
      document.body.style
        .overflow;


    document.body.style
      .overflow =
      "hidden";


    return () => {
      document.body.style
        .overflow =
        oldOverflow;
    };
  }, [
    menuOpen,
  ]);


  /* =======================================================
     PASS YOUR FONT CHOICES TO CSS

     You only edit HEADER_FONTS above.
  ======================================================= */

  const headerFontVariables = {
    "--header-brand-font":
      HEADER_FONTS.brand,

    "--header-desktop-nav-font":
      HEADER_FONTS.desktopNav,

    "--header-mobile-heading-font":
      HEADER_FONTS.mobileHeading,

    "--header-mobile-nav-font":
      HEADER_FONTS.mobileNav,

    "--header-mobile-note-font":
      HEADER_FONTS.mobileNote,
  };


  return (
    <header
      style={
        headerFontVariables
      }

      className={`
        site-header

        ${
          scrolled
            ? "site-header-scrolled"
            : ""
        }

        ${
          menuOpen
            ? "site-header-menu-open"
            : ""
        }
      `}
    >

      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <div
        className="
          site-header-shell
        "
      >

        {/* =================================================
            GLASS LENS BRAND
        ================================================= */}

        <Link
          href="/"

          className="
            site-brand
          "

          aria-label="
            Go to homepage
          "
        >

          <span
            className="
              site-brand-glow
            "

            aria-hidden="true"
          />


          <span
            className="
              site-brand-mark
            "

            aria-hidden="true"
          >

            <span>
              {
                HEADER_TEXT.brand
              }
            </span>

          </span>

        </Link>


        {/* =================================================
            DESKTOP NAV
        ================================================= */}

        <nav
          className="
            site-nav-desktop
          "

          aria-label="
            Primary navigation
          "
        >

          {navItems.map(
            (
              item
            ) => {

              const active =
                pathname ===
                item.href;


              return (
                <Link
                  key={
                    item.href
                  }

                  href={
                    item.href
                  }

                  className={`
                    site-nav-link

                    ${
                      active
                        ? "site-nav-link-active"
                        : ""
                    }
                  `}

                  aria-current={
                    active
                      ? "page"
                      : undefined
                  }
                >

                  <span
                    className="
                      site-nav-label
                    "
                  >
                    {
                      item.label
                    }
                  </span>

                </Link>
              );
            }
          )}

        </nav>


        {/* =================================================
            MOBILE HAMBURGER
        ================================================= */}

        <button
          type="button"

          className="
            site-menu-button
          "

          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }

          aria-expanded={
            menuOpen
          }

          aria-controls="
            mobile-site-menu
          "

          onClick={() =>
            setMenuOpen(
              (
                current
              ) =>
                !current
            )
          }
        >

          <span
            className="
              site-menu-button-glow
            "

            aria-hidden="true"
          />


          <span
            className={`
              site-menu-icon

              ${
                menuOpen
                  ? "is-open"
                  : ""
              }
            `}

            aria-hidden="true"
          >
            <i />
            <i />
          </span>

        </button>

      </div>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <AnimatePresence>
        {menuOpen && (

          <motion.div
            id="mobile-site-menu"

            className="
              site-mobile-menu-wrap
            "

            initial={{
              opacity:
                0,

              y:
                -14,

              scale:
                0.985,
            }}

            animate={{
              opacity:
                1,

              y:
                0,

              scale:
                1,
            }}

            exit={{
              opacity:
                0,

              y:
                -10,

              scale:
                0.985,
            }}

            transition={{
              duration:
                0.28,

              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >

            <div
              className="
                site-mobile-menu
              "
            >

              {/* ===========================================
                  MOBILE MENU HEADING
              =========================================== */}

              <div
                className="
                  site-mobile-menu-heading
                "
              >

                <span>
                  {
                    HEADER_TEXT.mobileHeading
                  }
                </span>


                <span>
                  {
                    HEADER_TEXT.mobileCount
                  }
                </span>

              </div>


              {/* ===========================================
                  MOBILE NAV
              =========================================== */}

              <nav
                className="
                  site-mobile-nav
                "

                aria-label="
                  Mobile navigation
                "
              >

                {navItems.map(
                  (
                    item,
                    index
                  ) => {

                    const active =
                      pathname ===
                      item.href;


                    return (
                      <motion.div
                        key={
                          item.href
                        }

                        initial={{
                          opacity:
                            0,

                          y:
                            18,
                        }}

                        animate={{
                          opacity:
                            1,

                          y:
                            0,
                        }}

                        transition={{
                          delay:
                            index *
                            0.045,

                          duration:
                            0.42,

                          ease: [
                            0.16,
                            1,
                            0.3,
                            1,
                          ],
                        }}
                      >

                        <Link
                          href={
                            item.href
                          }

                          className={`
                            site-mobile-link

                            ${
                              active
                                ? "site-mobile-link-active"
                                : ""
                            }
                          `}

                          aria-current={
                            active
                              ? "page"
                              : undefined
                          }
                        >

                          <span
                            className="
                              site-mobile-link-label
                            "
                          >
                            {
                              item.label
                            }
                          </span>


                          <span
                            className="
                              site-mobile-link-arrow
                            "

                            aria-hidden="true"
                          >
                            ↗
                          </span>

                        </Link>

                      </motion.div>
                    );
                  }
                )}

              </nav>


              {/* ===========================================
                  MOBILE NOTE
              =========================================== */}

              <p
                className="
                  site-mobile-menu-note
                "
              >
                {
                  HEADER_TEXT.mobileNote
                }
              </p>

            </div>

          </motion.div>

        )}
      </AnimatePresence>

    </header>
  );
}