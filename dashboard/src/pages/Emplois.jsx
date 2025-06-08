import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalAjoutEmploi from '../components/modals/ModalAjoutEmploi';
import Header from "../components/header/Header";
import { getAllEmploisAPI, deleteEmploiAPI } from '../redux/actions/emploi.actions';

export default function Emplois() {
  const [showModal, setShowModal] = useState(false);
  const [searchClasse, setSearchClasse] = useState('');
  const dispatch = useDispatch();

  const { emplois, loading, error } = useSelector((state) => state.emploi);
  const storedToken = localStorage.getItem("token");

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet emploi ?");
  if (confirmDelete) {
    try {
      await dispatch(deleteEmploiAPI(id));
      await dispatch(getAllEmploisAPI()); // Rafraîchit après suppression
      window.alert("Emploi supprimé avec succès !");
    } catch (err) {
      window.alert("Erreur lors de la suppression.");
    }
  }
};


  useEffect(() => {
    if (storedToken) {
      dispatch(getAllEmploisAPI());
    }
  }, [dispatch, storedToken]);

  const filteredEmplois = emplois?.filter((emploi) =>
    emploi?.idClasse?.nom?.toLowerCase().includes(searchClasse.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-6xl mx-auto p-4">
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg">
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
            Gestion des emplois du temps
          </h1>

          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Rechercher par nom de classe..."
              className="border border-gray-300 px-4 py-2 rounded w-1/2"
              value={searchClasse}
              onChange={(e) => setSearchClasse(e.target.value)}
            />
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Ajouter un emploi
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500">Chargement...</p>
          ) : error ? (
            <p className="text-red-500">Erreur : {error}</p>
          ) : filteredEmplois.length === 0 ? (
            <p className="text-gray-500">Aucun emploi trouvé pour cette classe.</p>
          ) : (
            filteredEmplois.map((emploi) => (
              <div
                key={emploi._id}
                className="border border-gray-200 p-4 rounded shadow flex items-center justify-between"
              >
                <div>
                  <p className="text-sm text-gray-600">
                    Classe : <strong>{emploi.idClasse ? emploi.idClasse.nom : 'Classe inconnue'}</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    Date : {emploi.date ? new Date(emploi.date).toLocaleDateString('fr-FR') : 'Date non disponible'}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:5000/${emploi.image}`}
                    alt={`Emploi du temps - Classe ${emploi.idClasse ? emploi.idClasse.nom : ''}`}
                    className="h-20 rounded shadow"
                  />
                  <button
                    className="text-red-600 font-semibold hover:underline"
                    onClick={() => handleDelete(emploi._id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}

         {showModal && (
  <ModalAjoutEmploi
    onClose={() => setShowModal(false)}
    onSuccessAjout={async () => {
      await dispatch(getAllEmploisAPI()); // recharge la liste après ajout
      setShowModal(false);
       window.alert("Emploi ajouté avec succès !");
    }}
  />
)}

        </div>
      </main>
    </div>
  );
}
