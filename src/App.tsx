import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// --- SECTIONS DE LA LANDING PAGE (Dossier /pages) ---
import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import MarqueeStrip from "./components/landing/MarqueeStrip";
import VehiculesSection from "./components/landing/VehiculesSection";
import HowItWorks from "./components/landing/HowItWorks"; 
import Temoignages from "./components/landing/Temoignages";
import Offres from "./components/landing/Offres";
import Footer from "./components/landing/Footer";

// --- AUTHENTIFICATION (Dossier /assets/components) ---
import AuthLayout from "./assets/components/AuthLayout";
import LoginForm from "./assets/components/LoginForm";
import SignUp from "./assets/components/SignUp";
import ForgotPassword from "./assets/components/ForgotPassword";

// --- DASHBOARD (Dossier /pages) ---
import Dashboard from "./pages/dashboard/Dashboard";

/**
 * COMPOSANT LANDING PAGE
 * Regroupe les sections de présentation du catalogue [3].
 */
const LandingPage: React.FC = () => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <main>
      <Hero />
      <MarqueeStrip />
      <VehiculesSection /> {/* Présentation des véhicules disponibles [3] */}
      <HowItWorks />
      <Offres />
      <Temoignages />
    </main>
    <Footer />
  </div>
);

/**
 * COMPOSANT DE ROUTAGE POUR L'AUTHENTIFICATION
 * Gère la logique de bascule entre les formulaires [3, 4].
 */
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

/**
 * COMPOSANT APP PRINCIPAL
 * Point d'entrée gérant le routing obligatoire entre les trois piliers [1, 3].
 */
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 1. Accueil : Landing Page avec identité visuelle propre [3, 4] */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. Authentification : Login, Inscription, Réinitialisation [1, 4] */}
        <Route path="/*" element={<AuthRoutes />} />

        {/* 3. Dashboard : Réservations et historique [2, 3] */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;