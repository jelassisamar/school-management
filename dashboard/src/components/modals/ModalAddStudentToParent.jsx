import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addParentChildAPI } from "../../redux/actions/parent.actions";

const ModalAddStudentToParent = ({
  show,
  onClose,
  parent,
  enfantsDisponibles,
  token,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleCheckboxChange = (e) => {
    const id = e.target.value;
    setSelectedStudents((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((sid) => sid !== id)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedStudents.length === 0) {
      alert("Veuillez sélectionner au moins un élève.");
      return;
    }

    try {
      await dispatch(addParentChildAPI(parent._id, selectedStudents, token));
      alert("Élève(s) ajouté(s) avec succès.");
      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout des élèves.");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>
        <h2 className="text-xl font-semibold mb-4">
          Ajouter un ou plusieurs élèves au parent {parent.nom} {parent.prenom}
        </h2>

        {enfantsDisponibles.length === 0 ? (
          <p>Aucun élève disponible sans parent.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="max-h-64 overflow-auto mb-4 border rounded p-2">
           
              {enfantsDisponibles.map((enfant) => (
                
                <label
                  key={enfant._id}
                  className="flex items-center space-x-2 mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={enfant._id}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-5 w-5"
                  />
                  <span>
                    {enfant.nom} {enfant.prenom}    {enfant.classe?.nom || 'Non spécifiée'}
                  </span>
                </label>
              ))}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Ajouter
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ModalAddStudentToParent;
