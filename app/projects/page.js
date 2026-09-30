import Projects from "../../components/projects";

export const metadata = {
  title:
    "Projects — Pratyusha",

  description:
    "Selected digital projects by Pratyusha.",
};


export default function ProjectsPage() {
  return (
    <main
      className="
        standalone-page
        standalone-page-projects
      "
    >
      <Projects />
    </main>
  );
}