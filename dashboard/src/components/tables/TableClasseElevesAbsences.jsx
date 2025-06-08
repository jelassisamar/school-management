import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClassesAPI } from "../../redux/actions/classe.actions";
import { Link } from "react-router-dom"; // ✅ 1. Importer Link

export default function TableClasseElevesAbsences() {
  const dispatch = useDispatch();
  const storedToken = localStorage.getItem("token");

  const { classes = [], loading, error } = useSelector((state) => state.classe);

  useEffect(() => {
    if (storedToken) {
      dispatch(getClassesAPI(storedToken));
    }
  }, [dispatch, storedToken]);

  if (loading) return <div className="text-center text-gray-500">Chargement...</div>;
  if (error) return <div className="text-center text-red-500">Erreur : {error}</div>;
  if (classes.length === 0) return <div className="text-center text-gray-500">Aucune classe trouvée.</div>;

  return (
    <div className="space-y-10">
      {classes.map((classe) => (
        <div key={classe._id} className="border rounded-lg p-4 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2">{classe.nom}</h2>

          {classe.enfants && classe.enfants.length > 0 ? (
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Nom complet</th>
                  <th className="p-3 text-left">Date de naissance</th>
                  <th className="p-3 text-left">Actions</th> {/* ✅ 2. Nouvelle colonne */}
                </tr>
              </thead>
              <tbody>
                {classe.enfants.map((eleve) => (
                  <tr key={eleve._id}>
                    <td className="p-3">{eleve.nomComplet}</td>
                    <td className="p-3">
                      {new Date(eleve.dateNaissance).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      {/* ✅ 3. Lien vers la page des absences */}
                      <Link
                        to={`/absences/eleve/${eleve._id}/${classe._id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                      >
                        Voir absences
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="italic text-gray-500">Aucun élève dans cette classe.</p>
          )}
        </div>
      ))}
    </div>
  );
}
