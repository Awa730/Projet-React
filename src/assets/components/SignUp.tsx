import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

interface SignUpProps {
  onSignUp: () => void;
  onSwitchToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp, onSwitchToLogin }) => {
  // Utilisation des states pour la gestion de l'interface et du chargement 
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulation de création de compte pour la location de voitures
    setTimeout(() => {
      setLoading(false);
      onSignUp(); 
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      
      {/* CHAMP NOM COMPLET */}
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-black text-[#94A3B8] uppercase tracking-widest ml-1">
          Nom Complet
        </label>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#F97316] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Ex: Jean Dupont"
            className="w-full .h-[56px] pl-12 bg-[#F8FAFC] border-2 border-transparent rounded-[18px] focus:bg-white focus:border-[#F97316]/20 outline-none transition-all font-semibold"
            required
          />
        </div>
      </div>

      {/* CHAMP EMAIL */}
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-black text-[#94A3B8] uppercase tracking-widest ml-1">
          Email
        </label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#F97316] transition-colors" size={20} />
          <input 
            type="email" 
            placeholder="votre@email.com"
            className="w-full .h-[56px] pl-12 bg-[#F8FAFC] border-2 border-transparent rounded-[18px] focus:bg-white focus:border-[#F97316]/20 outline-none transition-all font-semibold"
            required
          />
        </div>
      </div>

      {/* CHAMP MOT DE PASSE */}
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-black text-[#94A3B8] uppercase tracking-widest ml-1">
          Mot de passe
        </label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#F97316] transition-colors" size={20} />
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="••••••••••••"
            className="w-full .h-[56px] pl-12 pr-12 bg-[#F8FAFC] border-2 border-transparent rounded-[18px] focus:bg-white focus:border-[#F97316]/20 outline-none transition-all font-semibold"
            required
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#F97316]"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* BOUTON D'ACTION  */}
      <button 
        type="submit"
        disabled={loading}
        className="w-full .h-[64px] bg-[#0F172A] hover:bg-black text-white font-black rounded-[20px] shadow-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] uppercase tracking-[0.2em] mt-4"
      >
        {loading ? <Loader2 className="animate-spin" size={24} /> : "Créer mon compte"}
      </button>

      {/* LIEN VERS CONNEXION */}
      <div className="text-center mt-2">
        <p className="text-[#94A3B8] text-[14px] font-medium">
          Déjà un compte ?{" "}
          <button 
            type="button"
            onClick={onSwitchToLogin}
            className="text-[#F97316] font-black uppercase hover:underline"
          >
            Se connecter
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignUp;