import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClassesAPI, deleteClasseAPI } from "../../redux/actions/classe.actions";
import ModalUpdateClasse from "../modals/ModalupdateClasse";

export default function TableClasse() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClasse, setSelectedClasse] = useState(null);

  const dispatch = useDispatch();
  const { classes = [], loading, error } = useSelector((state) => state.classe);
  const storedToken = localStorage.getItem("token");

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  useEffect(() => {
    if (storedToken) {
      dispatch(getClassesAPI(storedToken));
    }
  }, [dispatch, storedToken]);

  const paginatedData = classes.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const totalPages = Math.ceil(classes.length / entriesPerPage);

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette classe ?")) {
      try {
        await dispatch(deleteClasseAPI(id, storedToken));
        // Refresh list after deletion:
        dispatch(getClassesAPI(storedToken));
      } catch (error) {
        alert("Erreur lors de la suppression : " + error.message);
      }
    }
  };

  return (
    <div className="bg-white">
      <main className="max-w-6xl mx-auto p-4">
        {/* Entries per page selection */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Afficher</span>
            <select
              value={entriesPerPage}
              onChange={handleEntriesChange}
              className="border rounded px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span className="text-gray-600">entrées</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center p-4">Chargement...</div>
        ) : error ? (
          <div className="text-center p-4 text-red-500">Erreur : {error}</div>
        ) : classes.length === 0 ? (
          <div className="text-center p-4">Aucune classe trouvée.</div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 font-medium">Nom</th>
                  <th className="p-3 font-medium">Nombre d'élèves</th>
                  <th className="p-3 font-medium">Date de création</th>
                  <th className="p-3 font-medium">Supprimer</th>
                  <th className="p-3 font-medium">Modifier</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((classe) => (
                  <tr key={classe._id}>
                    <td className="p-3 font-medium">{classe.nom}</td>
                    <td className="p-3">{classe.nombreEleves}</td>
                    <td className="p-3">
                      {new Date(classe.dateCreation).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(classe._id)}
                        className="text-red-600 hover:text-red-800 text-lg"
                        title="Supprimer"
                      >
                        ❌
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          setSelectedClasse(classe);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-lg"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="text-gray-600">
            Affichage de{" "}
            {classes.length === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1}{" "}
            à {Math.min(currentPage * entriesPerPage, classes.length)} sur{" "}
            {classes.length} classes
          </div>

          <div className="flex space-x-2">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Précédent
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-blue-600 text-white" : ""
                }`}
                disabled={currentPage === i + 1}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Suivant
            </button>
          </div>
        </div>
      </main>

      {/* Modal rendering inside return */}
      {isModalOpen && (
        <ModalUpdateClasse
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedClasse(null);
          }}
          parentData={selectedClasse}
          token={storedToken}
        />
      )}
    </div>
  );
}
