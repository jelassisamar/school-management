import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getParentsAPI, deleteParentAPI } from "../../redux/actions/parent.actions";
import ModalUpdateParent from "../modals/ModalUpdateParent";
import ModalAddStudentToParent from "../modals/ModalAddStudentToParent"; // nouveau modal

function TableParent({
  searchQuery,
  currentPage,
  entriesPerPage,
  setCurrentPage,
  token,
  handleParentClick,
  refresh,
}) {
  const dispatch = useDispatch();

  const { parents, loading, error } = useSelector((state) => state.parent);
const { students } = useSelector((state) => state.student);
const enfantsDisponibles = students?.filter((student) => !student.parent) || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);

  // Modal pour mise à jour parent (existant)
  const openModal = (parent) => {
    setSelectedParent(parent);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedParent(null);
  };

  // Modal pour ajouter élève à parent
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [parentForAddStudent, setParentForAddStudent] = useState(null);

  const openAddStudentModal = (parent) => {
    setParentForAddStudent(parent);
    setIsAddStudentModalOpen(true);
  };

  const closeAddStudentModal = () => {
    setIsAddStudentModalOpen(false);
    setParentForAddStudent(null);
  };

  useEffect(() => {
    if (token) {
      dispatch(getParentsAPI(token));
      // Ajouter aussi un fetch pour enfants sans parent
      dispatch({ type: "FETCH_ENFANTS_DISPONIBLES", payload: token });
    }
  }, [dispatch, token, refresh]);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce parent ?")) {
      try {
        await dispatch(deleteParentAPI(id, token));
        dispatch(getParentsAPI(token));
      } catch (err) {
        alert("Erreur lors de la suppression.");
      }
    }
  };

  const filteredParents = (parents || []).filter((parent) =>
    [parent.nom, parent.prenom, parent]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredParents.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const totalPages = Math.ceil(filteredParents.length / entriesPerPage);

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 font-medium">Nom Complet</th>
              <th className="p-3 font-medium">Date d'inscription</th>
              <th className="p-3 font-medium">Supprimer</th>
              <th className="p-3 font-medium">Modifier</th>
              <th className="p-3 font-medium">Afficher élèves</th>
              <th className="p-3 font-medium">Ajouter élève</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  Chargement...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  Aucun élément trouvé
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">
                    {item.nom} {item.prenom}
                  </td>

                  <td className="p-3">
                    {new Date(item.dateInscription || new Date()).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800 text-lg"
                      title="Supprimer"
                    >
                      ❌
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => openModal(item)}
                      className="text-blue-600 hover:text-blue-800 text-lg"
                      title="Modifier"
                    >
                      ✏️
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleParentClick(item._id)}
                      className="text-blue-600 hover:text-blue-800 text-sm underline"
                      title="Afficher les élèves"
                    >
                      Afficher les élèves
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => openAddStudentModal(item)}
                      className="text-green-600 hover:text-green-800 text-sm underline"
                      title="Ajouter un élève"
                    >
                      Ajouter élève
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ModalUpdateParent
          isOpen={isModalOpen}
          onClose={closeModal}
          parentData={selectedParent}
          token={token}
        />
      )}

      {isAddStudentModalOpen && parentForAddStudent && (
        <ModalAddStudentToParent
          show={isAddStudentModalOpen}
          onClose={closeAddStudentModal}
          parent={parentForAddStudent}
          enfantsDisponibles={enfantsDisponibles}
          token={token}
          onSuccess={() => {
            closeAddStudentModal();
            dispatch(getParentsAPI(token)); // rafraîchir la liste des parents
          }}
        />
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="text-gray-600">
          Affichage de{" "}
          {filteredParents.length === 0
            ? 0
            : (currentPage - 1) * entriesPerPage + 1}{" "}
          à{" "}
          {Math.min(currentPage * entriesPerPage, filteredParents.length)} sur{" "}
          {filteredParents.length} parents
        </div>

        <div className="flex space-x-2">
          <button
            className="px-3 py-1 border rounded"
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
            className="px-3 py-1 border rounded"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      </div>
    </>
  );
}

export default TableParent;
