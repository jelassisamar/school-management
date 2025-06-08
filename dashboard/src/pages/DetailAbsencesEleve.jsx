import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAbsencesParMatiereEleveAPI,
  ajouterAbsence,
} from "../redux/actions/absence.actions";
import { getMatieresParClasseAPI } from "../redux/actions/classe.actions";
import Header from "../components/header/Header";

export default function EleveAbsenceDetails() {
  const { id: eleveId, idClasse } = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { absencesParMatiere, loading, error } = useSelector((state) => state.absence);
  const { matieresParClasse = [], loading: loadingMatieres } = useSelector((state) => state.classe);

  const [form, setForm] = useState({ idmatiere: "", duree: "" });

  // Charger les matières de la classe
  useEffect(() => {
    if (idClasse && token) {
      dispatch(getMatieresParClasseAPI(idClasse, token));
    }
  }, [idClasse, token, dispatch]);

  // Charger les absences pour chaque matière
  useEffect(() => {
    if (eleveId && matieresParClasse.length > 0 && token) {
      matieresParClasse.forEach((matiere) => {
        dispatch(getAbsencesParMatiereEleveAPI(eleveId, matiere._id, token));
      });
    }
  }, [eleveId, matieresParClasse, token, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.idmatiere || !form.duree) {
      return alert("Tous les champs sont requis.");
    }

    try {
      await dispatch(ajouterAbsence({ 
        ideleve: eleveId, 
        idmatiere: form.idmatiere, 
        duree: form.duree 
      }, token));
      
      // Recharger les absences pour la matière ajoutée
      dispatch(getAbsencesParMatiereEleveAPI(eleveId, form.idmatiere, token));
      setForm({ idmatiere: "", duree: "" });
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'absence:", err);
    }
  };

  if (loading || loadingMatieres) return <p className="text-center">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error}</p>;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Absences par matière</h2>

        {/* Formulaire d'ajout */}
        <form onSubmit={handleSubmit} className="mb-6 space-y-3">
          <div>
            <label htmlFor="idmatiere" className="block font-medium">Matière</label>
            <select
              name="idmatiere"
              value={form.idmatiere}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Sélectionner une matière</option>
              {matieresParClasse.map((matiere) => (
                <option key={matiere._id} value={matiere._id}>
                  {matiere.nom}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="duree" className="block font-medium">Durée (heures)</label>
            <input
              type="number"
              name="duree"
              value={form.duree}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Durée"
              min="0.5"
              step="0.5"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "En cours..." : "Ajouter une absence"}
          </button>
        </form>

        {/* Liste des absences */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Résumé des absences</h3>
          {absencesParMatiere.length === 0 ? (
            <p>Aucune absence enregistrée.</p>
          ) : (
            <ul className="space-y-2">
              {absencesParMatiere
                .filter(item => item.duree > 0)
                .map((item) => (
                  <li
                    key={item.matiereId}
                    className="p-3 border rounded-md shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">{item.nomMatiere}</span> :{" "}
                      <span className="text-red-600">{item.duree} heures</span>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Liste complète des matières */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Matières de la classe</h3>
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Matière</th>
                <th className="border px-4 py-2">Coefficient</th>
                <th className="border px-4 py-2">Heures d'absence</th>
              </tr>
            </thead>
            <tbody>
              {matieresParClasse.map((matiere) => {
                const absence = absencesParMatiere.find(a => a.matiereId === matiere._id);
                const dureeAbsence = absence ? absence.duree : 0;
                
                return (
                  <tr key={matiere._id} className={dureeAbsence > 0 ? "bg-red-50" : ""}>
                    <td className="border px-4 py-2">{matiere.nom}</td>
                    <td className="border px-4 py-2 text-center">{matiere.coefficient}</td>
                    <td className="border px-4 py-2 text-center">
                      {dureeAbsence > 0 ? (
                        <span className="text-red-600 font-medium">{dureeAbsence}h</span>
                      ) : (
                        <span className="text-green-600">0h</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}