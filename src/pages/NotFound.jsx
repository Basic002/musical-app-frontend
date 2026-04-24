import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-night-bg font-body text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Effet lumineux décoratif en arrière-plan (Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-violet/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Texte 404 Stylisé avec les couleurs du thème */}
      <h1 className="text-9xl font-title font-black mb-4 tracking-tighter flex items-center justify-center drop-shadow-2xl z-10">
        <span className="text-neon-cyan">4</span>
        <span className="text-night-card border-8 border-white rounded-full w-24 h-24 mx-2 flex items-center justify-center relative">
          {/* Ligne au milieu du 0 pour faire un style panneau barré/disque */}
          <span className="absolute w-28 h-2 bg-neon-violet -rotate-45 rounded-full"></span>
        </span>
        <span className="text-neon-cyan">4</span>
      </h1>

      {/* Contenu textuel */}
      <div className="text-center z-10 mb-10">
        <h2 className="text-3xl font-title font-bold mb-3 text-white">
          Billet non valide
        </h2>
        <p className="text-night-text max-w-md mx-auto text-lg">
          Oups ! Il semblerait que le concert que vous cherchez n'existe pas, ou
          que la scène ait été démontée.
        </p>
      </div>

      {/* Bouton de retour */}
      <Link
        to="/"
        className="bg-night-card border-2 border-neon-violet text-white hover:bg-neon-violet px-8 py-3.5 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] z-10 flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Retourner à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;
