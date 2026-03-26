import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import MarqueeStrip from "./components/landing/MarqueeStrip";
import VehiculesSection from "./components/landing/VehiculesSection";
import HowItWorks from "./components/landing/HowItWorks"; 
import Temoignages from "./components/landing/Temoignages";
import Offres from "./components/landing/Offres";
import Footer from "./components/landing/Footer";
import AuthLayout from "./assets/components/AuthLayout";
import LoginForm from "./assets/components/LoginForm";
import SignUp from "./assets/components/SignUp";
import ForgotPassword from "./assets/components/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";

const LandingPage: React.FC = () => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <main>
      <Hero />
      <MarqueeStrip />
      <VehiculesSection />
      <HowItWorks />
      <Offres />
      <Temoignages />
    </main>
    <Footer />
  </div>
);
const AuthRoutes = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="login" element={
        <AuthLayout title="Connexion" subtitle="Accédez à votre espace Movia Automobile">
          <LoginForm 
            onLogin={() => navigate('/dashboard')} 
            onSwitchToSignUp={() => navigate('/register')}
            onSwitchToForgot={() => navigate('/forgot-password')}
          />
        </AuthLayout>
      } />
      
      <Route path="register" element={
        <AuthLayout title="Inscription" subtitle="Rejoignez la communauté Movia">
          <SignUp 
            onSignUp={() => navigate('/login')} 
            onSwitchToLogin={() => navigate('/login')}
          />
        </AuthLayout>
      } />

      <Route path="forgot-password" element={
        <AuthLayout title="Récupération" subtitle="Réinitialisez votre mot de passe">
          <ForgotPassword onBack={() => navigate('/login')} />
        </AuthLayout>
      } />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<AuthRoutes />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;