import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getMatieresAPI,
  addMatiereAPI,
  deleteMatiereAPI,
} from "../redux/actions/matiere.actions";

import { getClassesAPI } from "../redux/actions/classe.actions";

import Header from "../components/header/Header";

export default function Matieres() {
  const dispatch = useDispatch();

  const [nom, setNom] = useState("");
  const [coefficient, setCoefficient] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);

  const { matieres = [], loading = false, error = null } = useSelector(
    (state) => state.matiere || {}
  );
  const { classes = [] } = useSelector((state) => state.classe || {});

  useEffect(() => {
    dispatch(getMatieresAPI());
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getClassesAPI(token));
    }
  }, [dispatch]);

  // Gère l'ajout ou la suppression d'une classe dans le tableau selectedClasses
  const handleClassChange = (e) => {
    const classId = e.target.value;
    if (e.target.checked) {
      setSelectedClasses((prev) => [...prev, classId]);
    } else {
      setSelectedClasses((prev) => prev.filter((id) => id !== classId));
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!nom || !coefficient) return;

    dispatch(
      addMatiereAPI({
        nom,
        coefficient,
        classes: selectedClasses,
      })
    );

    setNom("");
    setCoefficient("");
    setSelectedClasses([]);
  };

  const handleDelete = (id) => {
    if (window.confirm("Confirmer la suppression ?")) {
      dispatch(deleteMatiereAPI(id));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-6xl mx-auto p-4">
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
            Gestion des matières
          </h1>

          <form onSubmit={handleAdd} className="mb-8 space-y-4">
            <div className="flex flex-wrap gap-4 items-end">
              <input
                type="text"
                placeholder="Nom de la matière"
                className="border p-2 flex-1 rounded"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
              <input
                type="number"
                placeholder="Coefficient"
                className="border p-2 w-32 rounded"
                value={coefficient}
                onChange={(e) => setCoefficient(e.target.value)}
              />

              {/* Affichage des cases à cocher pour la sélection des classes */}
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-gray-700">Classes :</p>
                <div className="flex flex-wrap gap-2">
                  {classes.map((classe) => (
                    <label
                      key={classe._id}
                      className="flex items-center space-x-2 border border-gray-300 rounded px-2 py-1 cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        value={classe._id}
                        checked={selectedClasses.includes(classe._id)}
                        onChange={handleClassChange}
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{classe.nom}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Ajouter
              </button>
            </div>
          </form>

          {loading && <p className="text-gray-500">Chargement...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Nom</th>
                <th className="border p-2">Coefficient</th>
                <th className="border p-2">Classes</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {matieres.map((matiere) => (
                <tr key={matiere._id}>
                  <td className="border p-2">{matiere.nom}</td>
                  <td className="border p-2">{matiere.coefficient}</td>
                  <td className="border p-2">
                    {matiere.classes?.length > 0
                      ? matiere.classes.map((classe) => classe.nom).join(", ")
                      : "Aucune"}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(matiere._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
              {matieres.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    Aucune matière trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
