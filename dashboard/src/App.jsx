import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home"
import AdminProfile from "./pages/AdminProfile";
import Eleves from "./pages/Eleves";
import Parents from "./pages/Parents";
import Classe from "./pages/Classe";
import Emplois from "./pages/Emplois";
import Matieres from "./pages/Matieres";
import Absences from "./pages/Absences";
import DetailAbsencesEleve from "./pages/DetailAbsencesEleve" 
import Resultats from "./pages/Resultats";

function App() {
  return (
    <div className="min-h-screen bg-gray-50"> {/* Conteneur principal */}
      <Router>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/eleves" element={<Eleves />} />
          <Route path="/classes" element={<Classe />} />
          <Route path="/parents" element={<Parents />} />
          <Route path="/emplois" element={<Emplois/>} />
          <Route path="/matieres" element={<Matieres/>} />
          <Route path="/absences" element={<Absences/>} />
          <Route path="/absences/eleve/:idEleve/:idClasse" element={<DetailAbsencesEleve />} />
          <Route path="/resultats" element={<Resultats/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;