import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-night-bg font-body text-white pb-10 relative">
      {/* HEADER */}
      <header className="h-20 border-b border-night-card flex items-center justify-between px-6 bg-night-bg sticky top-0 z-20">
        <Link
          to="/"
          className="text-3xl font-title font-bold tracking-wide hover:opacity-80 transition-opacity"
        >
          <span className="text-neon-violet">Disc</span>
          <span className="text-white">over</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-night-text hover:text-white transition-colors font-medium flex items-center gap-2"
          >
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Accueil
          </Link>
          <Link
            to="/favorites"
            className="text-night-text hover:text-neon-cyan transition-colors font-medium flex items-center gap-2"
          >
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Favoris
          </Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        <h1 className="text-3xl font-title font-bold mb-8">Mon Profil</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* COLONNE GAUCHE */}
          <div className="md:col-span-1 bg-night-card rounded-2xl border border-slate-800 p-6 flex flex-col items-center text-center shadow-lg h-fit">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-neon-violet to-neon-cyan mb-4 flex items-center justify-center text-3xl font-title font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              M
            </div>
            <h2 className="text-xl font-bold font-title mb-1">Exemple</h2>
            <p className="text-night-text text-sm mb-6">exemple@exemple.com</p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-night-bg border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-night-bg transition-colors py-2.5 rounded-lg font-medium mb-3"
            >
              Modifier le profil
            </button>

            <button className="w-full bg-night-bg border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-colors py-2.5 rounded-lg font-medium">
              Se déconnecter
            </button>
          </div>

          {/* COLONNE DROITE */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-night-card rounded-2xl border border-slate-800 p-6 shadow-lg">
              <h3 className="text-lg font-title font-bold mb-4 flex items-center gap-2">
                <span className="text-neon-violet">✨</span> Mes Préférences
                Musicales
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 bg-night-bg border border-slate-700 rounded-full text-sm">
                  🎸 Rock
                </span>
                <span className="px-4 py-1.5 bg-night-bg border border-slate-700 rounded-full text-sm">
                  🎧 Electro
                </span>
                <span className="px-4 py-1.5 bg-night-bg border border-slate-700 rounded-full text-sm">
                  🎹 Indie
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODALE DE MODIFICATION */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-night-card w-full max-w-md rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <h2 className="text-xl font-title font-bold text-white">
                Sécurité du compte
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-night-text hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form
              className="p-6 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(false);
              }}
            >
              {/* Nom d'utilisateur */}
              <div>
                <label className="block text-sm font-medium text-night-text mb-1">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  defaultValue="Exemple"
                  className="w-full bg-night-bg border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                />
              </div>

              {/* Nouveau mot de passe */}
              <div>
                <label className="block text-sm font-medium text-night-text mb-1">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-night-bg border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-violet transition-colors"
                />
              </div>

              {/* Confirmation */}
              <div>
                <label className="block text-sm font-medium text-night-text mb-1">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-night-bg border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-violet transition-colors"
                />
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg font-medium border border-slate-700 text-white hover:bg-slate-800 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-lg font-medium bg-neon-violet text-white hover:bg-purple-500 transition-all shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                >
                  Mettre à jour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
