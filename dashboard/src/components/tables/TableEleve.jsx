import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsAPI, deleteStudentAPI } from "../../redux/actions/student.actions";
import ModalUpdateStudent from "../modals/ModalUpdateStudent";

function TableEleve({
  searchQuery,
  loading,
  error,
  currentPage,
  entriesPerPage,
  setCurrentPage,  
  handleAddSuccess,
}) {
  const dispatch = useDispatch();
  const { students = [] } = useSelector((state) => state.student);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(getStudentsAPI(storedToken));
    }
  }, [dispatch]);

const filteredStudents = students.filter((student) => {
  const classeNom = student.classe ? student.classe.nom : "";
  const fullText = [student.nom, student.prenom, classeNom].join(" ").toLowerCase();
  return fullText.includes(searchQuery ? searchQuery.toLowerCase() : "");
});


  const paginatedData = filteredStudents.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet élève ?");
    if (!confirmDelete) return;

    const storedToken = localStorage.getItem("token");
    try {
      await dispatch(deleteStudentAPI(id, storedToken));
      await dispatch(getStudentsAPI(storedToken)); // Refresh data after delete
    } catch (err) {
      alert("Erreur lors de la suppression de l'élève : " + (err.response?.data?.message || err.message));
    }
  };

  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const totalPages = Math.ceil(filteredStudents.length / entriesPerPage);

  return (
    <>
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 font-medium">Nom Complet</th>
            <th className="p-3 font-medium">Classe</th>
            <th className="p-3 font-medium">Date d'inscription</th>
            <th className="p-3 font-medium">Supprimer</th>
            <th className="p-3 font-medium">Modifier</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="p-4 text-center">Chargement...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="5" className="p-4 text-center text-red-500">{error}</td>
            </tr>
          ) : paginatedData.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center">Aucun élément trouvé</td>
            </tr>
          ) : (
            paginatedData.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{item.nom} {item.prenom}</td>
                <td className="p-3">{item.classe ? item.classe.nom : 'Classe inconnue'}</td>
                <td className="p-3">
                  {new Date(item.dateInscription || new Date()).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-800 text-lg"
                    title="Supprimer"
                  >❌</button>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => openModal(item)}
                    className="text-blue-600 hover:text-blue-800 text-lg"
                    title="Modifier"
                  >✏️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
{isModalOpen && (
  <ModalUpdateStudent
    isOpen={isModalOpen}
    onClose={closeModal}
    studentData={selectedStudent}
  />
)}

    </div>


{/* Pagination */}
<div className="flex justify-between items-center mt-4 text-sm">
  <div className="text-gray-600">
    Affichage de{" "}
    {filteredStudents.length === 0
      ? 0
      : (currentPage - 1) * entriesPerPage + 1}{" "}
    à{" "}
    {Math.min(currentPage * entriesPerPage, filteredStudents.length)} sur{" "}
    {filteredStudents.length} élèves
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

export default TableEleve;
