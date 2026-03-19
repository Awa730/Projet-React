import Navbar from "../components/landing/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="pt-24 px-10">
        <h1 className="text-3xl font-bold text-orange-500">
          Movia Automobile 🚗
        </h1>
        <p className="text-gray-500 mt-2">Landing page en cours...</p>
      </div>
    </div>
  );
}