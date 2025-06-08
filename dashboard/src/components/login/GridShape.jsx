import React from "react";

export default function GridShape() {
  return (
    <>
        <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full mix-blend-overlay"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay"></div>
  </div>
  
  <div className="relative z-10 flex flex-col items-center justify-center px-12 text-white w-full h-full">
    <div className="mb-8 flex justify-center">
      <img 
        src="./images/logo.png" 
        className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
        alt="Logo MonLycee"
      />
    </div>
    <h2 className="text-3xl font-bold mb-4">Tableau de Bord Admin</h2>
    <p className="text-[#d6b8be] max-w-md">
      Gestion complète de votre établissement scolaire
    </p>
  </div>
    </>
  );
}