import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Home = ({ user, setUser }) => {
  const navigate = useNavigate();
  
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Récupération des événements au chargement
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        if (response.data.success) {
          setEvents(response.data.events);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des événements", error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  // Déconnexion
  const handleLogout = async () => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    if (isConfirmed) {
      try {
        await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
        setUser(null); 
        navigate('/'); 
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
      }
    }
  };

  // Filtrage des événements en fonction de la recherche
  const filteredEvents = events.filter((event) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const eventName = (event.name || "").toLowerCase();
    const venueName = (event._embedded?.venues?.[0]?.name || "").toLowerCase();
    const cityName = (event._embedded?.venues?.[0]?.city?.name || "").toLowerCase();
    return eventName.includes(term) || venueName.includes(term) || cityName.includes(term);
  });

  // Coordonnées pour centrer la carte sur la France
  const centerFrance = [46.603354, 1.888334];

  return (
    <div className="h-screen w-full flex flex-col bg-night-bg font-body text-white overflow-hidden">
      
      {/* --- HEADER --- */}
      <header className="border-b border-night-card bg-night-bg relative z-20 shrink-0">
        <div className="h-20 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="text-2xl sm:text-3xl font-title font-bold tracking-wide hover:opacity-80 transition-opacity">
              <span className="text-neon-violet">Disc</span>
              <span className="text-white">over</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Rechercher un artiste, une salle, une ville..." 
                className="w-full bg-night-card text-white border border-slate-700 rounded-full pl-5 pr-12 py-2.5 focus:outline-none focus:border-neon-violet transition-colors placeholder-night-text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-night-text hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {user ? (
              <>
                <Link to="/profile" className="text-night-text hover:text-white text-sm sm:text-base font-medium transition-colors whitespace-nowrap">Mon Profil</Link>
                <button onClick={handleLogout} className="bg-red-500/10 hover:bg-red-500 border border-red-500 text-red-500 hover:text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all whitespace-nowrap">Se déconnecter</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-night-text hover:text-white text-sm sm:text-base font-medium transition-colors whitespace-nowrap">Connexion</Link>
                <Link to="/register" className="bg-neon-violet hover:bg-purple-500 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] whitespace-nowrap">S'inscrire</Link>
              </>
            )}
          </div>
        </div>

        <div className="md:hidden px-4 pb-4">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full bg-night-card text-white border border-slate-700 rounded-full pl-5 pr-12 py-2 focus:outline-none focus:border-neon-violet transition-colors placeholder-night-text text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* --- ZONE PRINCIPALE (Scrollable) --- */}
      <main className="flex-1 overflow-y-auto bg-night-bg p-4 md:p-6 space-y-6">
        
        {/* VRAIE CARTE LEAFLET */}
        <div className="w-full h-[40vh] min-h-[350px] shrink-0 bg-night-card rounded-2xl border border-slate-700 relative overflow-hidden shadow-lg z-10">
          <MapContainer 
            center={centerFrance} 
            zoom={5} 
            scrollWheelZoom={true}
            className="w-full h-full z-0"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors &copy; CARTO'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {filteredEvents.map((event) => {
              const venue = event._embedded?.venues?.[0];
              if (venue && venue.location && venue.location.latitude && venue.location.longitude) {
                const lat = parseFloat(venue.location.latitude) + (Math.random() - 0.5) * 0.05;
                const lng = parseFloat(venue.location.longitude) + (Math.random() - 0.5) * 0.05;

                if (!isNaN(lat) && !isNaN(lng)) {
                  return (
                    <Marker 
                      key={event.id} 
                      position={[lat, lng]}
                      icon={customIcon}
                    >
                      <Popup className="custom-popup text-black">
                        <div className="text-center font-body min-w-[150px]">
                          <img src={event.images?.[0]?.url} alt={event.name} className="w-full h-24 object-cover rounded mb-2" />
                          <h3 className="font-bold text-slate-800 text-sm mb-1">{event.name}</h3>
                          <p className="text-slate-600 text-xs">{venue.name}</p>
                          <p className="text-neon-violet font-semibold text-xs mt-1">{event.dates?.start?.localDate}</p>
                        </div>
                      </Popup>
                    </Marker>
                  );
                }
              }
              return null;
            })}
          </MapContainer>

          {/* Filtres par-dessus la carte */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex gap-2 sm:gap-3 overflow-x-auto pb-2 z-[400] scrollbar-hide pointer-events-none">
            <button className="pointer-events-auto bg-night-bg/90 backdrop-blur-md border border-neon-cyan text-neon-cyan px-4 sm:px-5 py-1.5 sm:py-2 rounded-full whitespace-nowrap hover:bg-neon-cyan hover:text-night-bg transition-colors text-sm sm:text-base font-medium">🎸 Rock</button>
            <button className="pointer-events-auto bg-night-bg/90 backdrop-blur-md border border-slate-500 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-full whitespace-nowrap hover:border-white transition-colors text-sm sm:text-base font-medium">🎧 Electro</button>
            <button className="pointer-events-auto bg-night-bg/90 backdrop-blur-md border border-neon-violet text-neon-violet px-4 sm:px-5 py-1.5 sm:py-2 rounded-full whitespace-nowrap hover:bg-neon-violet hover:text-white transition-colors text-sm sm:text-base font-medium">🔥 Ce soir</button>
          </div>
        </div>

        {/* LISTE DES CONCERTS */}
        <div>
          <h2 className="text-2xl font-title font-bold mb-4 flex items-center gap-2 mt-8">
            🎟️ <span className="text-white">
              {searchTerm ? `Résultats pour "${searchTerm}"` : "Concerts à venir"}
            </span>
          </h2>

          {loadingEvents ? (
            <div className="text-center py-10 text-neon-violet animate-pulse">
              Recherche des meilleurs concerts en cours...
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              Aucun concert trouvé pour votre recherche. 😔
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-night-card rounded-xl overflow-hidden border border-slate-800 hover:border-neon-violet/50 transition-colors group flex flex-col shadow-lg">
                  <div className="h-48 overflow-hidden relative shrink-0">
                    <img 
                      src={event.images?.[0]?.url} 
                      alt={event.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                      {event.dates?.start?.localDate}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-lg text-white mb-1 truncate" title={event.name}>
                      {event.name}
                    </h3>
                    <p className="text-night-text text-sm flex items-center gap-1 mb-auto">
                      📍 {event._embedded?.venues?.[0]?.city?.name || "Lieu inconnu"}
                    </p>

                    <button 
                      onClick={() => window.open(event.url, "_blank")}
                      className="mt-4 w-full bg-slate-800 hover:bg-neon-cyan/20 text-neon-cyan border border-slate-700 hover:border-neon-cyan py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Voir les détails
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </main>
    </div>
  );
};

export default Home;