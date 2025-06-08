import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ajouterEleveAPI } from "../../redux/actions/student.actions";
import { getClassesAPI } from "../../redux/actions/classe.actions";

const ModalAjoutEleve = ({ show, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const { classes = [], loading, error } = useSelector((state) => state.classe);
  const [formData, setFormData] = useState({
    login: "",
    nom: "",
    prenom: "",
    motDePasse: "",
    dateNaissance: "",
    classe: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if (show && storedToken) {
      dispatch(getClassesAPI(storedToken));
    }
  }, [show, dispatch, storedToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) errors[key] = "Ce champ est requis.";
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (!storedToken) {
      alert("Token manquant !");
      return;
    }

    try {
      await dispatch(ajouterEleveAPI(formData, storedToken));
      setFormData({
        login: "",
        nom: "",
        prenom: "",
        motDePasse: "",
        dateNaissance: "",
        classe: "",
      });
      setFormErrors({});
      onClose();
      alert("Élève ajouté avec succès !");
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      alert(
        "Erreur lors de l'ajout de l'élève : " +
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
          <h2 className="text-lg font-medium text-gray-800 mb-4">Ajouter un élève</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {["login", "nom", "prenom", "motDePasse", "dateNaissance"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field === "motDePasse"
                      ? "Mot de passe"
                      : field === "dateNaissance"
                      ? "Date de naissance"
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={
                      field === "dateNaissance"
                        ? "date"
                        : field === "motDePasse"
                        ? "password"
                        : "text"
                    }
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${
                      formErrors[field] ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors[field] && (
                    <p className="text-red-500 text-xs mt-1">{formErrors[field]}</p>
                  )}
                </div>
              ))}

              {/* Class Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Classe
                </label>
                {loading ? (
                  <div className="p-2 border border-gray-300 rounded bg-gray-100 text-gray-500">
                    Chargement des classes...
                  </div>
                ) : error ? (
                  <div className="p-2 border border-red-300 rounded bg-red-100 text-red-500">
                    Erreur : {error}
                  </div>
                ) : (
                  <select
                    name="classe"
                    value={formData.classe}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${
                      formErrors.classe ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Sélectionnez une classe</option>
                    {classes.map((classe) => (
                      <option key={classe._id} value={classe._id}>
                        {classe.nom}
                      </option>
                    ))}
                  </select>
                )}
                {formErrors.classe && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.classe}</p>
                )}
              </div>
            </div>
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
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAjoutEleve;