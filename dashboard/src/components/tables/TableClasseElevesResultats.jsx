import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClassesAPI } from "../../redux/actions/classe.actions";
import { useNavigate } from "react-router-dom";

export default function TableClasseElevesResultats() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
                  <th className="p-3 text-left">Action</th>
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
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
                        onClick={() =>
                          navigate(`/resultats/eleve/${eleve._id}`, {
                            state: { classeId: classe._id },
                          })
                        }
                      >
                        Voir resultats
                      </button>
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
