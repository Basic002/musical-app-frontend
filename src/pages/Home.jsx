import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen w-full flex flex-col bg-night-bg font-body text-white overflow-hidden">
      
      {/* HEADER / NAVBAR */}
      <header className="h-20 border-b border-night-card flex items-center justify-between px-6 bg-night-bg relative z-20">
        
        {/* Logo à gauche */}
        <div className="flex items-center">
          <span className="text-3xl font-title font-bold text-neon-cyan">Discover</span>
        </div>

        {/* Barre de recherche au centre (Visible sur Desktop) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Rechercher un artiste, une salle, une ville..." 
              className="w-full bg-night-card text-white border border-slate-700 rounded-full pl-5 pr-12 py-2.5 focus:outline-none focus:border-neon-violet transition-colors placeholder-night-text"
            />
            {/* Icône de recherche (SVG simple) */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-night-text">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Boutons de navigation à droite */}
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-night-text hover:text-white font-medium transition-colors hidden sm:block">
            Connexion
          </Link>
          <Link to="/register" className="bg-neon-violet hover:bg-purple-500 text-white px-6 py-2 rounded-full font-medium transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">
            S'inscrire
          </Link>
        </div>
      </header>

      {/* ZONE PRINCIPALE (Carte + Filtres) */}
      <main className="flex-1 relative bg-night-bg p-4 flex">
        
        {/* FAUSSE CARTE (Placeholder visuel) */}
        <div className="w-full h-full bg-night-card/50 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center relative overflow-hidden">
           
           {/* Icône de carte */}
           <svg className="w-20 h-20 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
           </svg>
           <h2 className="text-3xl font-title font-bold text-slate-500 mb-2">Zone de la Carte</h2>
           <p className="text-slate-500 font-body">La carte interactive Leaflet sera intégrée ici plus tard.</p>

           {/* Filtres flottants par-dessus la "carte" */}
           <div className="absolute top-6 left-6 right-6 flex gap-3 overflow-x-auto pb-2 z-10">
              <button className="bg-night-bg/80 backdrop-blur-md border border-neon-cyan text-neon-cyan px-5 py-2 rounded-full whitespace-nowrap hover:bg-neon-cyan hover:text-night-bg transition-colors font-medium">
                🎸 Rock
              </button>
              <button className="bg-night-bg/80 backdrop-blur-md border border-slate-600 text-white px-5 py-2 rounded-full whitespace-nowrap hover:border-white transition-colors font-medium">
                🎧 Electro
              </button>
              <button className="bg-night-bg/80 backdrop-blur-md border border-slate-600 text-white px-5 py-2 rounded-full whitespace-nowrap hover:border-white transition-colors font-medium">
                🎷 Jazz
              </button>
              <button className="bg-night-bg/80 backdrop-blur-md border border-neon-violet text-neon-violet px-5 py-2 rounded-full whitespace-nowrap hover:bg-neon-violet hover:text-white transition-colors font-medium">
                🔥 Ce soir
              </button>
            </div>
            
        </div>
      </main>

    </div>
  );
};

export default Home;