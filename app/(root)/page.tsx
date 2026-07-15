import AboutMe from "@/components/AboutMe";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import MyCapabilities from "@/components/MyCapabilities";
import Projects from "@/components/Projects";


export default function Page() {
  return (
    <main className="relative w-full">
      <HeroSection />
      <Projects />
      <AboutMe />
      <MyCapabilities />
      <Contact />
      <Footer />
    </main>
  );
}