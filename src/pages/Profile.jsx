import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="min-h-screen bg-night-bg font-body text-white pb-10">
      {/* HEADER AVEC NAVIGATION */}
      <header className="h-20 border-b border-night-card flex items-center justify-between px-6 bg-night-bg sticky top-0 z-20">
        {/* Logo à gauche */}
        <Link
          to="/"
          className="text-2xl font-title font-bold tracking-wide hover:opacity-80 transition-opacity"
        >
          <span className="text-neon-violet">Disc</span>
          <span className="text-white">over</span>
        </Link>

        {/* Liens de navigation à droite */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-night-text hover:text-white transition-colors font-medium flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Accueil
          </Link>
          <Link
            to="/favorites"
            className="text-night-text hover:text-neon-cyan transition-colors font-medium flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Favoris
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Profile;
