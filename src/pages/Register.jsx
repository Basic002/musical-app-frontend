import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-night-bg font-body p-4 relative">
      {/* Bouton Retour discret */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-night-text hover:text-white transition-colors flex items-center gap-2"
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
        Retour à l'accueil
      </Link>

      {/* Carte du formulaire */}
      <div className="text-center mb-8">
        {/* Le logo Discover */}
        <div className="text-4xl font-title font-bold mb-6 tracking-wide">
          <span className="text-neon-violet">Disc</span>
          <span className="text-white">over</span>
        </div>
      </div>
      <div className="w-full max-w-md bg-night-card rounded-2xl shadow-2xl p-8 border border-slate-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-title font-bold text-white mb-2">
            Rejoignez-nous
          </h1>
          <p className="text-night-text">
            Créez un compte pour sauvegarder vos concerts.
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Champ Nom d'utilisateur */}
          <div>
            <label className="block text-sm font-medium text-night-text mb-1">
              Nom d'utilisateur*
            </label>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              className="w-full bg-night-bg border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-violet transition-colors placeholder-slate-600"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
