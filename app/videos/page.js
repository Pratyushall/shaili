import Videos from "../../components/videos";

export const metadata = {
  title:
    "Videos — Pratyusha",

  description:
    "Short films and moving images by Pratyusha.",
};


export default function VideosPage() {
  return (
    <main
      className="
        standalone-page
        standalone-page-videos
      "
    >
      <Videos />
    </main>
  );
}