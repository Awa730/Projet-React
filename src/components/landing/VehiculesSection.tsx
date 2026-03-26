import { useState } from "react";

type Tab = "location" | "achat";
type Status = "available" | "limited" | "unavailable";

interface Vehicule {
  id: number;
  nom: string;
  categorie: string;
  places: number;
  carburant: string;
  boite: string;
  statut: Status;
  prixLocation: number;
  prixAchat: number;
  image: string;
}

const vehicules: Vehicule[] = [
  { id: 1, nom: "BMW M4",              categorie: "Sport",    places: 4, carburant: "Essence", boite: "Manuelle",    statut: "available", prixLocation: 80000,  prixAchat: 35000000,   image: "/images/bmw.jpg"          },
  { id: 2, nom: "Mercedes CLA",        categorie: "Berline",  places: 5, carburant: "Diesel",  boite: "Automatique", statut: "available", prixLocation: 70000,  prixAchat: 28000000,   image: "/images/mercedes.jpg"     },
  { id: 3, nom: "Mercedes GLE",        categorie: "Luxe",     places: 5, carburant: "Diesel",  boite: "Automatique", statut: "available", prixLocation: 100000, prixAchat: 55000000,   image: "/images/mercedes-blanc.jpg"},
  { id: 4, nom: "Porsche 911 GT3",     categorie: "Sport",    places: 2, carburant: "Essence", boite: "Manuelle",    statut: "limited",   prixLocation: 200000, prixAchat: 120000000,  image: "/images/porsche.jpg"      },
  { id: 5, nom: "Ferrari 488",         categorie: "Supercar", places: 2, carburant: "Essence", boite: "Automatique", statut: "limited",   prixLocation: 350000, prixAchat: 250000000,  image: "/images/Ferrari.jpg"      },
  { id: 6, nom: "Lamborghini Sián",    categorie: "Supercar", places: 2, carburant: "Hybride", boite: "Manuelle",    statut: "limited",   prixLocation: 500000, prixAchat: 450000000,  image: "/images/Lamborghini.jpg"  },
  { id: 7, nom: "Bugatti Chiron",      categorie: "Hypercar", places: 2, carburant: "Essence", boite: "Automatique", statut: "limited",   prixLocation: 800000, prixAchat: 1200000000, image: "/images/bugatti.jpg"      },
  { id: 8, nom: "Bugatti Chiron White",categorie: "Hypercar", places: 2, carburant: "Essence", boite: "Automatique", statut: "available", prixLocation: 750000, prixAchat: 1100000000, image: "/images/bugatti-blanc.jpg"},
  { id: 9, nom: "BMW M3",              categorie: "Sport",    places: 4, carburant: "Essence", boite: "Manuelle",    statut: "available", prixLocation: 90000,  prixAchat: 40000000,   image: "/images/hero-car.jpg"     },
];

const statutConfig: Record<Status, { label: string; cls: string }> = {
  available:   { label: "Disponible",     cls: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  limited:     { label: "Dernière dispo", cls: "text-yellow-600 bg-yellow-50 border-yellow-200"   },
  unavailable: { label: "Indisponible",   cls: "text-red-600 bg-red-50 border-red-200"             },
};

const BadgeStatut = ({ statut }: { statut: Status }) => (
  <span className={`text-xs font-semibold tracking-widest uppercase px-2.5 py-1 border rounded-sm ${statutConfig[statut].cls}`}>
    {statutConfig[statut].label}
  </span>
);

const CarteVehicule = ({ vehicule, onglet }: { vehicule: Vehicule; onglet: Tab }) => (
  <div className="bg-white border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all group cursor-pointer rounded-sm">

    {/* Image */}
    <div className="relative h-48 bg-gray-50 rounded-t-sm overflow-hidden">
      <img
        src={vehicule.image}
        alt={vehicule.nom}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-3 left-3">
        <BadgeStatut statut={vehicule.statut} />
      </div>
      <div className="absolute top-3 right-3">
        <span className="text-xs text-gray-500 bg-white/90 border border-gray-100 px-2 py-0.5 rounded-sm">
          {vehicule.categorie}
        </span>
      </div>
    </div>

    {/* Contenu */}
    <div className="p-5">
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-500 transition-colors mb-1">
        {vehicule.nom}
      </h3>
      <p className="text-xs text-gray-400 mb-4">
        {vehicule.boite} · {vehicule.carburant}
      </p>

      {/* Specs */}
      <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 mb-5">
        <div className="text-center">
          <p className="text-sm font-bold text-gray-800">{vehicule.places}</p>
          <p className="text-xs text-gray-400">Places</p>
        </div>
        <div className="text-center border-x border-gray-100">
          <p className="text-xs font-bold text-gray-800">{vehicule.carburant}</p>
          <p className="text-xs text-gray-400">Carburant</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-bold text-gray-800">{vehicule.boite === "Manuelle" ? "Man." : "Auto."}</p>
          <p className="text-xs text-gray-400">Boîte</p>
        </div>
      </div>

      {/* Prix + Bouton */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">
            {onglet === "location" ? "Prix / jour" : "Prix d'achat"}
          </p>
          <p
            className="text-2xl font-black text-orange-500"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {onglet === "location"
              ? vehicule.prixLocation.toLocaleString("fr-FR")
              : vehicule.prixAchat.toLocaleString("fr-FR")}
            <span className="text-xs text-gray-400 font-normal ml-1">
              {onglet === "location" ? "FCFA/j" : "FCFA"}
            </span>
          </p>
        </div>
        <button
          disabled={vehicule.statut === "unavailable"}
          className={`px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-sm transition-all ${
            vehicule.statut !== "unavailable"
              ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-100"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {onglet === "location" ? "Réserver" : "Acheter"}
        </button>
      </div>
    </div>
  </div>
);

export default function VehiclesSection() {
  const [ongletActif, setOngletActif] = useState<Tab>("location");

  return (
    <section id="vehicles" className="px-6 md:px-[5vw] py-24 bg-white">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-orange-500 mb-3 font-semibold">
            Notre flotte
          </p>
          <h2
            className="text-[clamp(2.5rem,5vw,4rem)] text-gray-900 leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Véhicules<br />disponibles
          </h2>
        </div>
        <a
          href="#"
          className="text-gray-400 hover:text-orange-500 text-xs tracking-widest uppercase border-b border-gray-200 hover:border-orange-400 pb-0.5 transition-all mt-4 md:mt-0"
        >
          Voir tous les véhicules →
        </a>
      </div>

      {/* Onglets */}
      <div className="flex gap-2 mb-10">
        {(["location", "achat"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setOngletActif(tab)}
            className={`px-8 py-3 text-sm font-bold tracking-widest uppercase rounded-sm border transition-all ${
              ongletActif === tab
                ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-100"
                : "border-gray-200 text-gray-400 hover:border-orange-300 hover:text-orange-500 bg-white"
            }`}
          >
            {tab === "location" ? "🔑 Location" : "💰 Achat"}
          </button>
        ))}
      </div>

      {/* Grille */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicules.map((v) => (
          <CarteVehicule key={v.id} vehicule={v} onglet={ongletActif} />
        ))}
      </div>
    </section>
  );
}