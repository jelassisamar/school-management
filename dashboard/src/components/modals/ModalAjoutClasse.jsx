import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClasseAPI, getClassesAPI } from "../../redux/actions/classe.actions";

const ModalAjoutClasse = ({ show, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.classe);
  const [formData, setFormData] = useState({ nom: "" });
  const [formErrors, setFormErrors] = useState({});
  const storedToken = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.nom) {
      errors.nom = "Ce champ est requis.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      alert("Veuillez remplir le champ requis.");
      return;
    }

    if (!storedToken) {
      alert("Token manquant !");
      return;
    }

    try {
      await dispatch(createClasseAPI(formData, storedToken));
      setFormData({ nom: "" });
      setFormErrors({});
      onClose();
      alert("Classe ajoutée avec succès !");
      if (onSuccess) {
        // Rafraîchir la liste des classes après l'ajout
        await dispatch(getClassesAPI(storedToken));
        onSuccess();
      }
    } catch (err) {
      alert(
        "Erreur lors de l'ajout de la classe : " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/20">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md border border-gray-200 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <div className="p-5">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Ajouter une classe</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de la classe
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    formErrors.nom ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.nom && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.nom}</p>
                )}
              </div>
            </div>
            {error && (
              <div className="p-2 border border-red-300 rounded bg-red-100 text-red-500 mt-4">
                Erreur : {error}
              </div>
            )}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Ajout en cours..." : "Ajouter"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAjoutClasse;