import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import MarqueeStrip from "../components/landing/MarqueeStrip";
import VehiculesSection from "../components/landing/VehiculesSection";
import HowItWorks from "../components/landing/HowItWorks";
  

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <MarqueeStrip/>
      <VehiculesSection/>
      <HowItWorks/>
    </div>
  );
}