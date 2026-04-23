import { useState } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      artist: "Arctic Monkeys",
      date: "12 Mai 2026",
      venue: "Accor Arena, Paris",
      description:
        "Le groupe de rock britannique emblématique revient à Paris pour une date unique. Attendez-vous à un mix entre leurs classiques et les titres de leur dernier album 'The Car'.",
      ticketLink: "https://www.ticketmaster.fr",
      color: "from-purple-900 to-slate-800",
      tag: "12 Mai 2026",
    },
    {
      id: 2,
      artist: "Justice",
      date: "Ce soir",
      venue: "Le Zénith, Paris",
      description:
        "Le duo électro français le plus influent de sa génération transforme le Zénith en dancefloor géant. Un show visuel et sonore millimétré à ne pas manquer.",
      ticketLink: "https://www.dice.fm",
      color: "from-blue-900 to-slate-800",
      tag: "Ce soir",
    },
    {
      id: 3,
      artist: "L'Impératrice",
      date: "18 Juin 2026",
      venue: "La Cigale, Paris",
      description:
        "De la funk, du disco et de la pop solaire. L'Impératrice promet une soirée élégante et dansante dans le cadre intimiste de La Cigale.",
      ticketLink: "https://www.seetickets.com",
      color: "from-emerald-900 to-slate-800",
      tag: "18 Juin 2026",
    },
  ]);

  // 2. États pour la modale de détails
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour supprimer un favori
  const removeFavorite = (id) => {
    // Plus tard, ici on fera un appel API : axios.delete(...)
    setFavorites(favorites.filter((concert) => concert.id !== id));
  };

  // Fonction pour ouvrir les détails
  const openDetails = (concert) => {
    setSelectedConcert(concert);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-night-bg font-body text-white pb-10">
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
            Accueil
          </Link>
          <Link
            to="/profile"
            className="text-night-text hover:text-neon-violet transition-colors font-medium flex items-center gap-2"
          >
            Mon Profil
          </Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8">
        <h1 className="text-3xl font-title font-bold mb-8 text-white flex items-center gap-3">
          <span className="text-neon-cyan">❤</span> Mes Favoris
        </h1>

        {/* GRILLE DYNAMIQUE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((concert) => (
            <div
              key={concert.id}
              className="bg-night-card rounded-2xl overflow-hidden border border-slate-800 hover:border-neon-cyan transition-all group"
            >
              <div
                className={`h-40 bg-gradient-to-r ${concert.color} relative`}
              >
                {/* Petit Coeur */}
                <button
                  onClick={() => removeFavorite(concert.id)}
                  className="absolute top-3 right-3 bg-night-bg/80 backdrop-blur p-2 rounded-full text-neon-cyan hover:scale-110 transition-transform active:scale-90"
                  title="Retirer des favoris"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div className="absolute bottom-3 left-3 bg-night-bg/60 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {concert.tag}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-title font-bold text-xl mb-1 group-hover:text-neon-cyan transition-colors">
                  {concert.artist}
                </h3>
                <p className="text-night-text text-sm mb-4">{concert.venue}</p>
                <button
                  onClick={() => openDetails(concert)}
                  className="w-full py-2 bg-night-bg border border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  Voir les détails
                </button>
              </div>
            </div>
          ))}

          {favorites.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-2xl">
              <p className="text-night-text italic">
                Vous n'avez pas encore de favoris.
              </p>
              <Link
                to="/"
                className="text-neon-cyan hover:underline mt-2 inline-block"
              >
                Découvrir des concerts
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* MODALE DE DÉTAILS */}
      {isModalOpen && selectedConcert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-night-card w-full max-w-2xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden relative">
            {/* Image/Header Modale */}
            <div
              className={`h-48 bg-gradient-to-r ${selectedConcert.color} p-8 flex items-end`}
            >
              <h2 className="text-4xl font-title font-bold text-white">
                {selectedConcert.artist}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors"
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

            {/* Corps Modale */}
            <div className="p-8">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-night-bg px-4 py-2 rounded-xl border border-slate-800">
                  <p className="text-xs text-night-text uppercase font-bold">
                    Date
                  </p>
                  <p className="font-medium text-neon-cyan">
                    {selectedConcert.date}
                  </p>
                </div>
                <div className="bg-night-bg px-4 py-2 rounded-xl border border-slate-800">
                  <p className="text-xs text-night-text uppercase font-bold">
                    Lieu
                  </p>
                  <p className="font-medium">{selectedConcert.venue}</p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-bold text-night-text uppercase mb-2">
                  Description
                </h4>
                <p className="text-white leading-relaxed">
                  {selectedConcert.description}
                </p>
              </div>

              <div className="flex gap-4">
                <a
                  href={selectedConcert.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-neon-violet hover:bg-purple-500 text-white text-center py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                >
                  Accéder à la billetterie
                </a>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
