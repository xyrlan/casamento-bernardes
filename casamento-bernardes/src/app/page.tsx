import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import SectionSeparator from "./components/SectionSeparator";
import AboutSection from "./components/AboutSection";


export default function Home() {
  return (
    <>
      <HeroSection />
      <SectionSeparator />
      <AboutSection />
    </>
  );
}
