import { useState } from "react";
import { Link } from "react-router-dom";

const AdminEventForm = () => {
  // ÉTATS POUR L'IMAGE (PREVIEW ET FICHIER)
  const [imagePreview, setImagePreview] = useState(null); // Pour afficher l'aperçu
  const [isDragging, setIsDragging] = useState(false); // Pour le style visuel au survol

  // 1. Quand le fichier entre dans la zone de dépôt
  const handleDragOver = (e) => {
    e.preventDefault(); // Obligatoire pour permettre le dépôt
    setIsDragging(true);
  };

  // 2. Quand le fichier quitte la zone de dépôt (sans être lâché)
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // 3. Quand le fichier est lâché dans la zone de dépôt
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    // On récupère le fichier lâché
    const file = e.dataTransfer.files[0];

    // Si c'est bien une image, on génère un aperçu
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 4. Gestionnaire pour le champ input classique (pour ceux qui cliquent au lieu de glisser)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-night-bg font-body text-white pb-10 relative">
      {/* HEADER ADMIN */}
      <header className="h-20 border-b border-slate-800 flex items-center justify-between px-6 bg-night-card sticky top-0 z-20 shadow-md">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-2xl font-title font-bold tracking-wide hover:opacity-80 transition-opacity"
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
            to="/admin"
            className="text-night-text hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
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
            Retour au Dashboard
          </Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-title font-bold text-white mb-2">
            Créer un événement
          </h1>
          <p className="text-night-text">
            Remplissez les informations ci-dessous pour ajouter un nouveau
            concert à la carte.
          </p>
        </div>

        {/* CARTE DU FORMULAIRE */}
        <div className="bg-night-card rounded-2xl border border-slate-800 shadow-xl p-6 md:p-8">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* GRILLE 2 COLONNES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-night-text mb-1.5">
                  Affiche du concert *
                </label>

                {/* La zone de dépôt (Drag & Drop Zone) */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative w-full h-48 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-2 text-center group cursor-pointer overflow-hidden ${
                    isDragging
                      ? "border-neon-cyan bg-neon-cyan/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                      : "border-slate-700 bg-night-bg hover:border-slate-500"
                  }`}
                >
                  {/* Champ caché input classique (au cas où on clique) */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />

                  {/* Condition : Si pas d'aperçu, on montre l'icône */}
                  {!imagePreview ? (
                    <>
                      <svg
                        className="w-12 h-12 text-slate-600 mb-3 group-hover:text-slate-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 00-2 2z"
                        ></path>
                      </svg>
                      <p className="text-slate-500 font-medium text-sm">
                        Glissez une affiche ici{" "}
                        <span className="text-slate-600">(PNG, JPG)</span>
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        ou cliquez pour parcourir
                      </p>
                    </>
                  ) : (
                    // Condition : Si aperçu, on montre l'image
                    <div className="w-full h-full rounded-xl overflow-hidden relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />

                      {/* Bouton pour supprimer l'image */}
                      <button
                        onClick={() => setImagePreview(null)}
                        className="absolute top-3 right-3 p-1.5 bg-black/70 rounded-full text-white hover:bg-red-500 transition-colors z-20"
                        title="Supprimer l'image"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Nom de l'artiste / Événement */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-night-text mb-1">
                  Nom de l'artiste ou de l'événement *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Daft Punk (Tribute)"
                  className="w-full bg-night-bg border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors placeholder-slate-600"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-night-text mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  className="w-full bg-night-bg border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors [color-scheme:dark]"
                />
              </div>

              {/* Heure */}
              <div>
                <label className="block text-sm font-medium text-night-text mb-1">
                  Heure (Ouverture des portes)
                </label>
                <input
                  type="time"
                  className="w-full bg-night-bg border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors [color-scheme:dark]"
                />
              </div>

              {/* Salle / Lieu */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-night-text mb-1">
                  Lieu / Salle *
                </label>
                <input
                  type="text"
                  placeholder="Ex: L'Olympia, Paris"
                  className="w-full bg-night-bg border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors placeholder-slate-600"
                />
              </div>

              {/* Coordonnées GPS (Pour Leaflet) */}
              <div>
                <label className="block text-sm font-medium text-night-text mb-1">
                  Latitude (GPS)
                </label>
                <input
                  type="text"
                  placeholder="48.8702"
                  className="w-full bg-night-bg border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-violet transition-colors placeholder-slate-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-night-text mb-1">
                  Longitude (GPS)
                </label>
                <input
                  type="text"
                  placeholder="2.3283"
                  className="w-full bg-night-bg border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-violet transition-colors placeholder-slate-600"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-night-text mb-1">
                  Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Style de musique, premières parties..."
                  className="w-full bg-night-bg border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors placeholder-slate-600 resize-none"
                ></textarea>
              </div>
            </div>

            {/* BOUTONS D'ACTION */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col-reverse sm:flex-row justify-end gap-4">
              <Link
                to="/admin"
                className="px-6 py-3 rounded-lg font-medium border border-slate-700 text-white hover:bg-slate-800 transition-colors text-center"
              >
                Annuler
              </Link>
              <button
                type="submit"
                className="px-8 py-3 rounded-lg font-bold bg-neon-cyan text-night-bg hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)]"
              >
                Publier l'événement
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminEventForm;
