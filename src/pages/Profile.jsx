import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api"; 

const Profile = () => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // On garde ton état pour la modale !
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/profile");
        if (response.data.success) {
          setUser(response.data.data); 
        }
      } catch (err) {
        setError("Impossible de charger le profil. Veuillez vous reconnecter.");
        if (err.response?.status === 401) {
          setTimeout(() => navigate("/login"), 2000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/");
    } catch (err) {
      console.error("Erreur lors de la déconnexion:", err);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-night-bg text-white"><div className="text-xl font-title animate-pulse text-neon-violet">Chargement du profil...</div></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-night-bg text-red-400 p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-night-bg font-body text-white pb-10 relative">
      {/* HEADER */}
      <header className="h-20 border-b border-night-card flex items-center justify-between px-6 bg-night-bg sticky top-0 z-20">
        <Link to="/" className="text-3xl font-title font-bold tracking-wide hover:opacity-80 transition-opacity">
          <span className="text-neon-violet">Disc</span><span className="text-white">over</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-night-text hover:text-white transition-colors font-medium flex items-center gap-2">
             Accueil
          </Link>
          <Link to="/favorites" className="text-night-text hover:text-neon-cyan transition-colors font-medium flex items-center gap-2">
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
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            {/* 🟢 ICI ON AFFICHE LE VRAI NOM ET EMAIL */}
            <h2 className="text-xl font-bold font-title mb-1">{user?.name || "Utilisateur"}</h2>
            <p className="text-night-text text-sm mb-6">{user?.email}</p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-night-bg border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-night-bg transition-colors py-2.5 rounded-lg font-medium mb-3"
            >
              Modifier le profil
            </button>

            <button onClick={handleLogout} className="w-full bg-night-bg border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-colors py-2.5 rounded-lg font-medium">
              Se déconnecter
            </button>
          </div>

          {/* COLONNE DROITE */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-night-card rounded-2xl border border-slate-800 p-6 shadow-lg">
              <h3 className="text-lg font-title font-bold mb-4 flex items-center gap-2">
                <span className="text-neon-violet">✨</span> Statistiques
              </h3>
              <div className="flex gap-4">
                <div className="p-4 bg-night-bg rounded-xl border border-slate-800">
                   <p className="text-night-text text-sm mb-1">Événements en favoris</p>
                   <p className="text-2xl font-bold text-neon-cyan">{user?.favorites?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* (Tu pourras garder ta modale de modification ici comme avant !) */}
    </div>
  );
};

export default Profile;