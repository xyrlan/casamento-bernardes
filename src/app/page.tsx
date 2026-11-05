import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SplineSection from "./components/SplineSection";
import MesmoDia from "./components/MesmoDia";
import ParallaxSection from "./components/ParallaxSection";
import PartySection from "./components/PartySection";
import Album from "./components/Album";
import { CeuDeLuzes } from "./components/CeuDeLuzes";
import { Rodape } from "./components/Rodape";

export default function Home() {
  return (
    // overflow-x-clip (e não overflow-hidden) para o "sticky" da festa funcionar
    <main id="topo" className="relative overflow-x-clip bg-noite">
      <CeuDeLuzes />
      <HeroSection />
      <AboutSection />
      <SplineSection />
      <MesmoDia />
      <ParallaxSection />
      <PartySection />
      <Album />
      <Rodape />
    </main>
  );
}
