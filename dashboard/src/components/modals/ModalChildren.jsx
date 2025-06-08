import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchParentChildren , deleteChildAssociationAPI } from "../../redux/actions/parent.actions";

const ModalChildren = ({ parentId, token, onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enfants, setEnfants] = useState([]);

  useEffect(() => {
    const loadChildren = async () => {
      try {
        setLoading(true);
        const enfantsData = await dispatch(fetchParentChildren(parentId, token));
        console.log("Données brutes enfants :", enfantsData);
        setEnfants(Array.isArray(enfantsData) ? enfantsData : []); // Ensure enfantsData is an array
        setError(null);
      } catch (err) {
        setError("Erreur lors de la récupération des enfants");
        console.error(err);
        setEnfants([]);
      } finally {
        setLoading(false);
      }
    };

    if (parentId) {
      loadChildren();
    }
  }, [parentId, dispatch, token]);



const handleDelete = async (idEleve) => {
  if (window.confirm("Êtes-vous sûr de vouloir dissocier cet élève du parent ?")) {
    try {
      await dispatch(deleteChildAssociationAPI(parentId, idEleve, token));
      setEnfants((prev) => prev.filter((enf) => enf._id !== idEleve));
    } catch (error) {
      alert("Erreur lors de la dissociation.");
    }
  }
};

 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-md transition-opacity duration-300 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-gray-100 animate-scaleIn transition-transform duration-300">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">Liste des Élèves</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Fermer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(90vh-72px)]">
          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-lg font-medium text-gray-700 mb-2">Erreur</h4>
              <p className="text-gray-500 max-w-md">{error}</p>
            </div>
          ) : enfants && enfants.length > 0 ? (
            <div className="relative">
              <table className="w-full">
                <thead className="sticky top-0 z-10 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nom</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Prénom</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date de Naissance</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Classe</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {enfants.map((enfant) => (
                    <tr
                      key={enfant._id}
                      className="hover:bg-gray-50/80 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{enfant.nom || 'Non spécifié'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{enfant.prenom || 'Non spécifié'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {enfant.dateNaissance ? new Date(enfant.dateNaissance).toLocaleDateString() : 'Non spécifié'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {enfant.classe?.nom || 'Non spécifiée'}
                        </span>
                      </td>

                       <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => handleDelete(enfant._id)}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Supprimer
        </button>
      </td> 
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-lg font-medium text-gray-700 mb-2">Aucun enfant trouvé</h4>
              <p className="text-gray-500 max-w-md">Ce parent n'a aucun élève enregistré.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalChildren;