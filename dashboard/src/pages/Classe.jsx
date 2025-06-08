import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClassesAPI } from "../redux/actions/classe.actions";
import ModalAjoutClasse from "../components/modals/ModalAjoutClasse";
import TableClasse from "../components/tables/TableClasse";
import Header from "../components/header/Header";

export default function Classe() {
  const dispatch = useDispatch();
  const { classes = [], loading, error } = useSelector((state) => state.classe);
  const [showModal, setShowModal] = useState(false);
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if (storedToken) {
      dispatch(getClassesAPI(storedToken));
    }
  }, [dispatch, storedToken]);

  const handleAddSuccess = () => {
    // La liste des classes est déjà rafraîchie dans ModalAjoutClasse via onSuccess
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-medium">Liste des Classes</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Ajouter une classe
          </button>
        </div>

        <TableClasse classes={classes} loading={loading} error={error} />

        <ModalAjoutClasse
          show={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={handleAddSuccess}
        />
      </main>
    </div>
  );
}