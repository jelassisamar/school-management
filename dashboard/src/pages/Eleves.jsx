import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header/Header";
import TableEleve from "../components/tables/TableEleve";
import ModalAjoutEleve from "../components/modals/ModalAjoutEleve";
import { getStudentsAPI } from "../redux/actions/student.actions";

function Eleves({ token }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.student);

  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const isMounted = useRef(true);

  const handleAddSuccess = () => {
    const storedToken = token || localStorage.getItem("token");
    if (storedToken) {
      dispatch(getStudentsAPI(storedToken));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Liste des élèves</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Ajouter un élève
          </button>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Afficher{" "}
            <select
              className="border rounded p-1 mx-1"
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>{" "}
            élèves
          </div>
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <TableEleve
          searchQuery={searchQuery}
          loading={loading}
          error={error}
          entriesPerPage={entriesPerPage}
          currentPage={currentPage}
          handleAddSuccess={handleAddSuccess}
        />

        <div className="flex justify-between items-center mt-4 text-sm">
          {/* Pagination Code */}
          
        </div>
      </main>

      {/* Modal d'ajout d'élève */}
      <ModalAjoutEleve
        show={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
}

export default Eleves;


