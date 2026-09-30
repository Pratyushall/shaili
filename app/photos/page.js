import Photos from "../../components/photos";

export const metadata = {
  title:
    "Photos — Pratyusha",

  description:
    "A photography journal of people and places.",
};


export default function PhotosPage() {
  return (
    <main
      className="
        standalone-page
        standalone-page-photos
      "
    >
      <Photos />
    </main>
  );
}