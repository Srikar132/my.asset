import AboutMe from "@/components/AboutMe";
import HeroSection from "@/components/HeroSection";
import Projects from "@/components/Projects";


export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden w-full">
      <HeroSection/>
      <Projects/>
      <AboutMe/>
    </main>
  );
}