

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-[5vw] pb-[8vh] overflow-hidden bg-white">

      {/* Image de fond */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-car.jpg"
          alt="Hero car"
          className="w-full h-full object-cover opacity-20"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-transparent to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-400/10 blur-[100px]" />
      </div>

      {/* Contenu */}
      <div className="relative z-10">

        {/* Label */}
        <p className="text-xs tracking-[0.3em] uppercase text-orange-500 mb-4 font-semibold">
          Location & Vente de véhicules premium
        </p>

        {/* Titre */}
        <h1
          className="text-[clamp(3.5rem,12vw,10rem)] leading-[0.9] text-gray-900 mb-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}
        >
          <span
            className="block text-gray-400 text-[0.38em] mb-2"
            style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
          >
            La route vous appartient
          </span>
          MOVIA<span className="text-orange-500">.</span>
        </h1>

        {/* Description + boutons */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="text-gray-500 max-w-md leading-relaxed text-base">
            <strong className="text-gray-800">Plus de 200 véhicules disponibles.</strong>{" "}
            Location à la journée ou achat, trouvez le véhicule de vos rêves.
            Livraison à domicile, assurance incluse.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="#vehicles"
              className="px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold tracking-widest uppercase rounded-sm transition-all hover:shadow-lg hover:shadow-orange-200"
            >
              Explorer les véhicules
            </a>
            <a
              href="#how"
              className="flex items-center gap-2 text-gray-400 hover:text-orange-500 text-xs tracking-widest uppercase border-b border-gray-300 hover:border-orange-400 pb-0.5 transition-all"
            >
              Comment ça marche
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-10 mt-10 pt-8 border-t border-gray-200">
          {[
            { value: "200+", label: "Véhicules disponibles" },
            { value: "50K+", label: "Clients satisfaits" },
            { value: "15",   label: "Villes couvertes" },
            { value: "4.9★", label: "Note moyenne" },
          ].map((s) => (
            <div key={s.label}>
              <p
                className="text-3xl text-orange-500 leading-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {s.value}
              </p>
              <p className="text-xs text-gray-400 tracking-widest uppercase mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}