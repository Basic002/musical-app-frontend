import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Nos fausses pages en attendant de les créer
const Favorites = () => <div className="p-10 text-center"><h1 className="text-4xl text-neon-cyan font-title font-bold">Mes Favoris</h1></div>;
const AdminDashboard = () => <div className="p-10 text-center"><h1 className="text-4xl text-white font-title font-bold">Dashboard Admin</h1></div>;
const AdminEventForm = () => <div className="p-10 text-center"><h1 className="text-4xl text-white font-title font-bold">Créer un événement</h1></div>;
const NotFound = () => <div className="p-10 text-center"><h1 className="text-4xl text-red-500 font-title font-bold">Erreur 404 - Page introuvable</h1></div>;

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-night-bg text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/event" element={<AdminEventForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;