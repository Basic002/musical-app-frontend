import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = ({ user, setUser }) => {
  const navigate = useNavigate();

  // Fonction pour gérer la déconnexion avec confirmation
  const handleLogout = async () => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    if (isConfirmed) {
      try {
        await axios.post('http://localhost:5000/api/auth/logout', {}, {
          withCredentials: true 
        });
        setUser(null);
        navigate('/');
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-night-bg font-body text-white overflow-hidden">
      {/* HEADER / NAVBAR RESPONSIVE */}
      <header className="border-b border-night-card bg-night-bg relative z-20">
        <div className="h-20 flex items-center justify-between px-4 sm:px-6">
          {/* Logo à gauche */}
          <div className="flex items-center flex-shrink-0">
            <Link
              to="/"
              className="text-2xl sm:text-3xl font-title font-bold tracking-wide hover:opacity-80 transition-opacity"
            >
              <span className="text-neon-violet">Disc</span>
              <span className="text-white">over</span>
            </Link>
          </div>

          {/* Barre de recherche au centre (Visible sur Desktop uniquement) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher un artiste, une salle, une ville..."
                className="w-full bg-night-card text-white border border-slate-700 rounded-full pl-5 pr-12 py-2.5 focus:outline-none focus:border-neon-violet transition-colors placeholder-night-text"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-night-text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* RENDU CONDITIONNEL DES BOUTONS */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {user ? (
              /* --- SI CONNECTÉ --- */
              <>
                <Link
                  to="/profile"
                  className="text-night-text hover:text-white text-sm sm:text-base font-medium transition-colors whitespace-nowrap"
                >
                  Mon Profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/10 hover:bg-red-500 border border-red-500 text-red-500 hover:text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all whitespace-nowrap"
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              /* --- SI NON CONNECTÉ --- */
              <>
                <Link
                  to="/login"
                  className="text-night-text hover:text-white text-sm sm:text-base font-medium transition-colors whitespace-nowrap"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-neon-violet hover:bg-purple-500 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] whitespace-nowrap"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Barre de recherche Mobile */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full bg-night-card text-white border border-slate-700 rounded-full pl-5 pr-12 py-2 focus:outline-none focus:border-neon-violet transition-colors placeholder-night-text text-sm"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-night-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* ZONE PRINCIPALE (Carte + Filtres) */}
      <main className="flex-1 relative bg-night-bg p-4 flex">
        {/* FAUSSE CARTE */}
        <div className="w-full h-full bg-night-card/50 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center relative overflow-hidden">
          <svg
            className="w-16 h-16 sm:w-20 sm:h-20 text-slate-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            ></path>
          </svg>
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-slate-500 mb-2 text-center">
            Zone de la Carte
          </h2>
          <p className="text-slate-500 font-body text-center text-sm sm:text-base px-4">
            La carte interactive Leaflet sera intégrée ici plus tard.
          </p>

          {/* Filtres flottants */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex gap-2 sm:gap-3 overflow-x-auto pb-2 z-10 scrollbar-hide">
            <button className="bg-night-bg/80 backdrop-blur-md border border-neon-cyan text-neon-cyan px-4 sm:px-5 py-1.5 sm:py-2 rounded-full whitespace-nowrap hover:bg-neon-cyan hover:text-night-bg transition-colors text-sm sm:text-base font-medium">
              🎸 Rock
            </button>
            <button className="bg-night-bg/80 backdrop-blur-md border border-slate-600 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-full whitespace-nowrap hover:border-white transition-colors text-sm sm:text-base font-medium">
              🎧 Electro
            </button>
            <button className="bg-night-bg/80 backdrop-blur-md border border-slate-600 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-full whitespace-nowrap hover:border-white transition-colors text-sm sm:text-base font-medium">
              🎷 Jazz
            </button>
            <button className="bg-night-bg/80 backdrop-blur-md border border-neon-violet text-neon-violet px-4 sm:px-5 py-1.5 sm:py-2 rounded-full whitespace-nowrap hover:bg-neon-violet hover:text-white transition-colors text-sm sm:text-base font-medium">
              🔥 Ce soir
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;