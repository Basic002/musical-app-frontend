import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // On envoie name, email et password au back-end
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-night-bg font-body p-4 relative">
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

      <div className="text-center mb-4">
        <div className="text-4xl font-title font-bold tracking-wide">
          <span className="text-neon-violet">Disc</span>
          <span className="text-white">over</span>
        </div>
      </div>

      <div className="w-full max-w-md bg-night-card rounded-2xl shadow-2xl p-8 border border-slate-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-title font-bold text-white mb-2">
            Créer un compte
          </h1>
          <p className="text-night-text">
            Rejoignez-nous pour sauvegarder vos événements.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-night-text mb-1">
              Nom d'utilisateur*
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
              className="w-full bg-night-bg border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-violet transition-colors placeholder-slate-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-night-text mb-1">
              Adresse email*
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@musique.com"
              className="w-full bg-night-bg border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-violet transition-colors placeholder-slate-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-night-text mb-1">
              Mot de passe*
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-night-bg border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-violet transition-colors placeholder-slate-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-neon-cyan hover:bg-cyan-500 text-slate-900 font-title font-bold py-3 rounded-lg mt-6 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
          >
            S'inscrire
          </button>
        </form>

        <div className="mt-6 text-center text-night-text text-sm">
          Déjà un compte ?{" "}
          <Link
            to="/login"
            className="text-neon-violet hover:underline font-medium"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
