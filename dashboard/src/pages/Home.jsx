import React from "react";
import Header from "../components/header/Header";

export default function Home() {
  // Données de démonstration
  const stats = [
    { title: "Élèves inscrits", value: "423", change: "+12 ce mois", icon: "👨‍🎓", color: "bg-blue-100 text-blue-600" },
    { title: "Parents", value: "28", change: "+12 ce mois", icon: "👩‍🏫", color: "bg-purple-100 text-purple-600" },
    { title: "Nouveaux messages", value: "14", change: "5 non lus", icon: "✉️", color: "bg-green-100 text-green-600" },
    { title: "Taux d'absence", value: "4.2%", change: "-1.1% vs hier", icon: "❌", color: "bg-red-100 text-red-600" },
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tableau de Bord</h1>
          <p className="text-gray-600 mt-2">Bienvenue sur le portail administratif</p>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm p-6 flex items-start transition-all hover:shadow-md"
            >
              <div className={`rounded-full p-3 mr-4 ${stat.color}`}>
                <span className="text-xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold my-1">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


         
        </div>

        {/* Section secondaire */}

      </main>
    </div>
  );
}