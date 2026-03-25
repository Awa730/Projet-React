import { useState, useEffect } from "react";

interface Reservation {
  id: number;
  vehicule: string;
  image: string;
  categorie: string;
  type: "location" | "achat";
  nom: string;
  telephone: string;
  email: string;
  dateDebut: string;
  dateFin: string;
  adresse: string;
  prix: number;
  date: string;
  statut: string;
}

export default function Dashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filtre, setFiltre] = useState<"tous" | "location" | "achat">("tous");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("reservations") || "[]");
    setReservations(data);
  }, []);

  const filtrees = reservations.filter((r) =>
    filtre === "tous" ? true : r.type === filtre
  );

  const totalLocation = reservations.filter((r) => r.type === "location").length;
  const totalAchat = reservations.filter((r) => r.type === "achat").length;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 md:px-[5vw] py-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs tracking-widest uppercase text-orange-500 mb-1">
              Tableau de bord
            </p>
            <h1
              className="text-4xl text-gray-900"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Historique
            </h1>
          </div>
          <a
            href="/"
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold tracking-widest uppercase rounded-sm transition-all"
          >
            ← Retour
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 border border-gray-100 rounded-sm p-4">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Total</p>
            <p
              className="text-3xl text-gray-900"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {reservations.length}
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-sm p-4">
            <p className="text-xs text-orange-400 uppercase tracking-widest mb-1">Locations</p>
            <p
              className="text-3xl text-orange-500"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {totalLocation}
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-sm p-4">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Achats</p>
            <p
              className="text-3xl text-gray-900"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {totalAchat}
            </p>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="px-6 md:px-[5vw] py-4 flex gap-2">
        {(["tous", "location", "achat"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFiltre(f)}
            className={`px-5 py-2 text-xs font-bold tracking-widest uppercase rounded-sm border transition-all ${
              filtre === f
                ? "bg-orange-500 border-orange-500 text-white"
                : "border-gray-200 text-gray-400 hover:border-orange-300 hover:text-orange-500 bg-white"
            }`}
          >
            {f === "tous" ? "Tous" : f === "location" ? "Locations" : "Achats"}
          </button>
        ))}
      </div>

      {/* Liste */}
      <div className="px-6 md:px-[5vw] py-6">
        {filtrees.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🚗</p>
            <p className="text-gray-400 text-lg font-medium">
              Aucune réservation pour l'instant
            </p>
            <a
              href="/"
              className="inline-block mt-4 px-6 py-3 bg-orange-500 text-white text-xs font-bold tracking-widest uppercase rounded-sm"
            >
              Voir les véhicules
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtrees.map((r) => (
              <div
                key={r.id}
                className="bg-white border border-gray-100 rounded-sm overflow-hidden hover:border-orange-200 hover:shadow-md transition-all"
              >
                {/* Image */}
                <div className="h-40 bg-gray-50 overflow-hidden">
                  <img
                    src={r.image}
                    alt={r.vehicule}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Contenu */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{r.vehicule}</h3>
                      <p className="text-xs text-gray-400">{r.categorie}</p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-sm border ${
                        r.type === "location"
                          ? "text-orange-500 bg-orange-50 border-orange-200"
                          : "text-emerald-600 bg-emerald-50 border-emerald-200"
                      }`}
                    >
                      {r.type === "location" ? "Location" : "Achat"}
                    </span>
                  </div>

                  <div className="space-y-1.5 border-t border-gray-100 pt-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Client</span>
                      <span className="font-medium text-gray-700">{r.nom}</span>
                    </div>
                    {r.type === "location" && r.dateDebut && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Du</span>
                        <span className="font-medium text-gray-700">{r.dateDebut}</span>
                      </div>
                    )}
                    {r.type === "location" && r.dateFin && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Au</span>
                        <span className="font-medium text-gray-700">{r.dateFin}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Date</span>
                      <span className="font-medium text-gray-700">{r.date}</span>
                    </div>
                    <div className="flex justify-between text-xs border-t border-gray-100 pt-2 mt-2">
                      <span className="text-gray-400">Prix</span>
                      <span className="font-bold text-orange-500">
                        {r.prix.toLocaleString("fr-FR")} FCFA
                        {r.type === "location" && "/j"}
                      </span>
                    </div>
                  </div>

                  {/* Statut */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-yellow-600 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-sm font-medium">
                      {r.statut}
                    </span>
                    <p className="text-xs text-gray-400">{r.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}