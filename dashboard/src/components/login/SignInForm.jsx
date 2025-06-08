import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../redux/actions/auth.actions';

export default function SignInForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user, loading, error } = useSelector((state) => state.auth); 

  const [login, setLogin] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [isReady, setIsReady] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!login || !motDePasse) return; 
    console.log("debut")
    dispatch(loginAction({ login, motDePasse }));
  };

  useLayoutEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady && isAuthenticated && user) {
      if (user.role === "admin") {
        navigate('/');
      }
    }
  }, [isReady, isAuthenticated, user, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">MonLycee</h1>
      <p className="text-center text-gray-600 mb-8">Espace Administrateur</p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error.message || "Erreur de connexion"}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleLogin}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Login <span className="text-red-500">*</span>
          </label>
          <input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            type="text"
            placeholder="Entrez votre Login"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#965261] focus:border-[#965261] transition-all"
            required
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mot de passe <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Entrez votre mot de passe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#965261] focus:border-[#965261] transition-all pr-10"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#965261] hover:bg-[#7a4350] text-white font-medium rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#965261] focus:ring-offset-2 disabled:opacity-50"
          disabled={loading || !login || !motDePasse}
        >
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}