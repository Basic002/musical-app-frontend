import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import AdminDashboard from './pages/AdminDashboard';
import AdminEventForm from './pages/AdminEventForm';
import NotFound from './pages/NotFound';

// Les fausses pages en attendant de les créer
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