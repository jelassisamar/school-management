import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsAPI } from "../redux/actions/student.actions";
import Header from "../components/header/Header";
import ModalAjoutParent from "../components/modals/ModalAjoutParent";
import TableParent from "../components/tables/TableParent";
import ModalChildren from "../components/modals/ModalChildren";

function Parents({ token }) {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.student);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const storedToken = token || localStorage.getItem("token");

  useEffect(() => {
    if (storedToken) {
      dispatch(getStudentsAPI(storedToken));
    }
  }, [dispatch, storedToken]);

  const availableEnfants = students?.filter((student) => !student.parent) || [];

  const handleParentClick = (parentId) => {
    setSelectedParentId(parentId);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Liste des Parents</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Ajouter un Parent
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
            parents
          </div>
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <TableParent
          searchQuery={searchQuery}
          currentPage={currentPage}
          entriesPerPage={entriesPerPage}
          setCurrentPage={setCurrentPage}
          token={storedToken}
          handleParentClick={handleParentClick}
          refresh={refresh}
        />
      </div>

      {showModal && (
        <ModalAjoutParent
          show={showModal}
          onClose={() => setShowModal(false)}
          availableEnfants={availableEnfants}
          token={storedToken}
          onSuccess={() => {
            setShowModal(false);
            setRefresh(prev => !prev); // Toggle pour déclencher useEffect
          }}

        />
      )}

      {selectedParentId && (
        <ModalChildren
          parentId={selectedParentId}
          token={storedToken}
          onClose={() => setSelectedParentId(null)}
        />
      )}
    </div>
  );
}

export default Parents;
