import React from 'react';
import Header from '../components/header/Header';

const AdminProfile = () => {
  // Données de l'administrateur
  const adminData = {
    nom: "Martin",
    prenom: "Sophie",
    email: "s.martin@ecole-exemple.fr",
    telephone: "+33 6 12 34 56 78",
    role: "Administrateur principal",
    dateEmbauche: "15/03/2018",
    derniereConnexion: "Aujourd'hui à 08:45",
    ecole: "École Primaire Les Lilas",
    permissions: [
      { name: "Gestion des utilisateurs", active: true },
      { name: "Configuration système", active: true },
      { name: "Accès aux rapports", active: true },
      { name: "Modification des notes", active: false }
    ],
    stats: {
      lastLoginDevice: "MacBook Pro (Safari)",
      loginLocation: "Paris, France",
      accountCreated: "15/03/2018"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* En-tête avec avatar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
              {adminData.prenom.charAt(0)}{adminData.nom.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {adminData.prenom} {adminData.nom}
              </h1>
              <p className="text-gray-600">{adminData.role} • {adminData.ecole}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Modifier le profil
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Mot de passe
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section Informations personnelles */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Informations personnelles</h2>
                <span className="text-sm text-blue-600 cursor-pointer">Voir tout</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500">Nom complet</label>
                  <p className="font-medium">{adminData.prenom} {adminData.nom}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="font-medium">{adminData.email}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500">Téléphone</label>
                  <p className="font-medium">{adminData.telephone}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500">Rôle</label>
                  <p className="font-medium">{adminData.role}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500">Date d'embauche</label>
                  <p className="font-medium">{adminData.dateEmbauche}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500">École</label>
                  <p className="font-medium">{adminData.ecole}</p>
                </div>
              </div>
            </div>

            {/* Section Sécurité */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Sécurité du compte</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Authentification à deux facteurs</p>
                    <p className="text-sm text-gray-500">Améliorez la sécurité de votre compte</p>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                    Activer
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-500">Dernière connexion</p>
                    <p className="font-medium">{adminData.derniereConnexion}</p>
                    <p className="text-xs text-gray-400 mt-1">{adminData.stats.lastLoginDevice}</p>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-500">Localisation</p>
                    <p className="font-medium">{adminData.stats.loginLocation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* Section Permissions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Permissions</h2>
              
              <div className="space-y-3">
                {adminData.permissions.map((permission, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${permission.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span>{permission.name}</span>
                    </div>
                    {permission.active ? (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Inactive</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section Actions rapides */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Actions rapides</h2>
              
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Exporter les données
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  Paramètres de notifications
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Désactiver le compte
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProfile;