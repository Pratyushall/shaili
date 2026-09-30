import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

import "./styles/hero.css";
import "./styles/about.css";
import "./styles/projects.css";
import "./styles/photos.css";
import "./styles/videos.css";
import "./styles/header.css";
import "./styles/footer.css";

import Header from "../components/header";
import Footer from "../components/footer";


/* =========================================================
   FONTS
========================================================= */

const geistSans = Geist({
  variable:
    "--font-geist-sans",

  subsets: [
    "latin",
  ],
});


const geistMono = Geist_Mono({
  variable:
    "--font-geist-mono",

  subsets: [
    "latin",
  ],
});


/* =========================================================
   METADATA
========================================================= */

export const metadata = {
  title:
    "Pratyusha — Visual Journal",

  description:
    "Photography, films, projects, and things made somewhere between code and feeling.",
};


/* =========================================================
   ROOT LAYOUT

   HEADER + SCROLL FOOTER LIVE HERE.

   So they automatically appear on:
   - Home
   - Projects
   - Photos
   - Videos
   - any future page
========================================================= */

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en"

      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        h-full
        antialiased
      `}
    >
      <body
        className="
          min-h-full
          flex
          flex-col
        "
      >

        <Header />


        {children}


        <Footer />

      </body>
    </html>
  );
}