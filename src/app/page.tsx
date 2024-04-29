import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import SectionSeparator from "./components/SectionSeparator";
import AboutSection from "./components/AboutSection";
import SplineSection from "./components/SplineSection";


export default function Home() {
  return (
    <main className="bg-preto">
      <HeroSection />
      <AboutSection />
      <SplineSection />
    </main>
  );
}
