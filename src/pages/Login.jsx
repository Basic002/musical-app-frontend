import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-night-bg font-body p-4 relative">
      
      {/* Bouton Retour discret */}
      <Link to="/" className="absolute top-6 left-6 text-night-text hover:text-white transition-colors flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Retour à l'accueil
      </Link>


        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          




        </form>

      </div>
  );
};

export default Login;