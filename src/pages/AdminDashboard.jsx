import { Link } from "react-router-dom";

const AdminDashboard = () => {
  // Fausses données pour simuler la liste des événements
  const mockEvents = [
    {
      id: 1,
      name: "Arctic Monkeys",
      date: "12/05/2026",
      venue: "Accor Arena, Paris",
      status: "À venir",
    },
    {
      id: 2,
      name: "Justice",
      date: "23/04/2026",
      venue: "Le Zénith, Paris",
      status: "Ce soir",
    },
    {
      id: 3,
      name: "L'Impératrice",
      date: "18/06/2026",
      venue: "La Cigale, Paris",
      status: "À venir",
    },
    {
      id: 4,
      name: "Daft Punk (Tribute)",
      date: "10/01/2026",
      venue: "Olympia, Paris",
      status: "Terminé",
    },
  ];

  return (
    <div className="min-h-screen bg-night-bg font-body text-white pb-10">
      {/* HEADER ADMIN */}
      <header className="h-20 border-b border-slate-800 flex items-center justify-between px-6 bg-night-card sticky top-0 z-20 shadow-md">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-3xl font-title font-bold tracking-wide hover:opacity-80 transition-opacity"
          >
            <span className="text-neon-violet">Disc</span>
            <span className="text-white">over</span>
          </Link>
          <span className="bg-red-500/20 text-red-400 border border-red-500/50 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
            Admin Panel
          </span>
        </div>

        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="text-night-text hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
          >
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour au site public
          </Link>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        {/* EN-TÊTE DU DASHBOARD */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-title font-bold text-white">
            Vue d'ensemble
          </h1>

          <Link
            to="/admin/event"
            className="bg-neon-violet hover:bg-purple-500 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] flex items-center gap-2 w-fit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Créer un événement
          </Link>
        </div>

        {/* CARTES DE STATISTIQUES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-night-card p-6 rounded-2xl border border-slate-800 shadow-lg">
            <p className="text-night-text text-sm font-medium mb-1">
              Total Événements
            </p>
            <p className="text-3xl font-title font-bold text-white">124</p>
          </div>
          <div className="bg-night-card p-6 rounded-2xl border border-slate-800 shadow-lg">
            <p className="text-night-text text-sm font-medium mb-1">
              Événements Actifs
            </p>
            <p className="text-3xl font-title font-bold text-neon-cyan">42</p>
          </div>
          <div className="bg-night-card p-6 rounded-2xl border border-slate-800 shadow-lg">
            <p className="text-night-text text-sm font-medium mb-1">
              Utilisateurs
            </p>
            <p className="text-3xl font-title font-bold text-white">1,893</p>
          </div>
          <div className="bg-night-card p-6 rounded-2xl border border-slate-800 shadow-lg">
            <p className="text-night-text text-sm font-medium mb-1">
              Salles partenaires
            </p>
            <p className="text-3xl font-title font-bold text-white">18</p>
          </div>
        </div>

        {/* TABLEAU DES ÉVÉNEMENTS */}
        <div className="bg-night-card rounded-2xl border border-slate-800 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-xl font-title font-bold text-white">
              Gestion des événements
            </h2>

            {/* Petite barre de recherche admin */}
            <div className="relative">
              <input
                type="text"
                placeholder="Chercher..."
                className="bg-night-bg border border-slate-700 rounded-lg pl-4 pr-10 py-1.5 text-sm text-white focus:outline-none focus:border-neon-cyan"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-night-text"
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

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-night-bg text-night-text text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Nom de l'événement</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Lieu</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {mockEvents.map((event) => (
                  <tr
                    key={event.id}
                    className="hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-white">
                      {event.name}
                    </td>
                    <td className="px-6 py-4 text-night-text">{event.date}</td>
                    <td className="px-6 py-4 text-night-text">{event.venue}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          event.status === "À venir"
                            ? "bg-cyan-900/30 text-neon-cyan border border-neon-cyan/50"
                            : event.status === "Ce soir"
                              ? "bg-violet-900/30 text-neon-violet border border-neon-violet/50"
                              : "bg-slate-800 text-slate-400 border border-slate-700"
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center justify-end gap-3">
                      {/* Bouton Éditer */}
                      <button
                        className="text-slate-400 hover:text-neon-cyan transition-colors"
                        title="Modifier"
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      {/* Bouton Supprimer */}
                      <button
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        title="Supprimer"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination (statique pour l'instant) */}
          <div className="p-4 border-t border-slate-800 flex items-center justify-between text-sm text-night-text bg-night-bg/50">
            <span>Affichage de 1 à 4 sur 124 événements</span>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-night-card border border-slate-700 rounded hover:text-white disabled:opacity-50"
                disabled
              >
                Précédent
              </button>
              <button className="px-3 py-1 bg-night-card border border-slate-700 rounded hover:text-white">
                Suivant
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
