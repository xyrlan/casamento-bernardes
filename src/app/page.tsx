import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import SectionSeparator from "./components/SectionSeparator";
import AboutSection from "./components/AboutSection";
import SplineSection from "./components/SplineSection";
import { ParallaxImages } from "./components/ParallaxImages";
import ParallaxSection from "./components/ParallaxSection";
import PartySection from "./components/PartySection";


export default function Home() {
  return (
    <main className="bg-preto relative">
      <HeroSection />
      <AboutSection />
      <SplineSection />
      <ParallaxSection />
      <PartySection />
    </main>
  );
}
