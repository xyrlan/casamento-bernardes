import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SplineSection from "./components/SplineSection";
import ParallaxSection from "./components/ParallaxSection";
import PartySection from "./components/PartySection";


export default function Home() {
  return (
    <main className="bg-preto relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-indig-900/30 via-rose-900/40 to-indigo-900/30 z-0" />
      <div className="fixed inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 z-0" />
      <HeroSection />
      <AboutSection />
      <SplineSection />
      <ParallaxSection />
      <div className="relative z-10">
        <PartySection />
      </div>
    </main>
  );
}
