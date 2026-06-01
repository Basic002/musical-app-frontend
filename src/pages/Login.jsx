import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.data.success) {
        setUser(response.data.user);
        
        navigate("/profile");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-night-bg font-body p-4 relative">
      <Link
        to="/"
        className="absolute top-6 left-6 text-night-text hover:text-white transition-colors flex items-center gap-2"
      >
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
            Bon retour !
          </h1>
          <p className="text-night-text">
            Connectez-vous pour retrouver vos favoris.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
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
            className="w-full bg-neon-violet hover:bg-purple-500 text-white font-title font-bold py-3 rounded-lg mt-6 transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-6 text-center text-night-text text-sm">
          Pas encore de compte ?{" "}
          <Link
            to="/register"
            className="text-neon-cyan hover:underline font-medium"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;