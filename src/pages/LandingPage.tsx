import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import MarqueeStrip from "../components/landing/MarqueeStrip";
import VehiculesSection from "../components/landing/VehiculesSection";
import HowItWorks from "../components/landing/HowItWorks";
import Temoignages from "../components/landing/Temoignages";
import Offres from "../components/landing/Offres";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <MarqueeStrip/>
      <VehiculesSection/>
      <HowItWorks/>
      <Temoignages/>
      <Offres/>
      <Footer/>
    </div>
  );
}