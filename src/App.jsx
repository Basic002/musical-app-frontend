import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import AdminDashboard from './pages/AdminDashboard';
import AdminEventForm from './pages/AdminEventForm';
import NotFound from './pages/NotFound';

function App() {
  // 1. États pour gérer l'utilisateur et le temps de chargement initial
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Vérification de la session au lancement ou au rafraîchissement (F5)
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Remplace l'URL par la route de ton API qui renvoie les infos du profil connecté
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true // Indispensable pour envoyer le cookie de session
        });

        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.log("Aucune session active. Utilisateur non connecté.");
      } finally {
        setLoading(false); // On arrête le chargement quoi qu'il arrive
      }
    };

    checkSession();
  }, []);

  // 3. Écran d'attente pendant que React interroge le serveur
  if (loading) {
    return (
      <div className="min-h-screen bg-night-bg flex items-center justify-center text-neon-violet font-title text-xl">
        Chargement de Discover...
      </div>
    );
  }

  // 4. Rendu de l'application
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-night-bg text-white">
        <Routes>
          {/* Home a besoin de savoir si on est connecté pour la Navbar */}
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          
          {/* Login a besoin de setUser pour enregistrer l'utilisateur dans l'état après la connexion */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          
          {/* Register n'a généralement pas besoin de props, sauf si tu connectes l'utilisateur automatiquement après inscription */}
          <Route path="/register" element={<Register />} />
          
          {/* Favorites aura besoin de l'id de l'utilisateur pour requêter ses favoris */}
          <Route path="/favorites" element={<Favorites user={user} />} />
          
          {/* Profile a besoin d'afficher les infos (user) et de les mettre à jour/déconnecter (setUser) */}
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          
          {/* Les pages admin auront besoin de vérifier que l'utilisateur a le rôle "admin" */}
          <Route path="/admin" element={<AdminDashboard user={user} />} />
          <Route path="/admin/event" element={<AdminEventForm user={user} />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;