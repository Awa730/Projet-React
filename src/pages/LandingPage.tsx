import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import MarqueeStrip from "../components/MarqueeStrip";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
      <MarqueeStrip/>
    </div>
  );
}