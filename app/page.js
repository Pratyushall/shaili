import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Photos from "@/components/photos";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Photos />
    </main>
  );
}