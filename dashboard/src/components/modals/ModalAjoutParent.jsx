import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ajouterParentAPI } from "../../redux/actions/parent.actions";

const ModalAjoutParent = ({ show, onClose, availableEnfants, token, onSuccess }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    login: "",
    nom: "",
    prenom: "",
    motDePasse: "",
    enfants: [],
  });

  const [formErrors, setFormErrors] = useState({});
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStudentSelect = (e) => {
    const selectedId = e.target.value;
    setSelectedStudentId(selectedId);
    setFormData((prev) => ({
      ...prev,
      enfants: selectedId ? [selectedId] : [],
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.login) errors.login = "Login est requis";
    if (!formData.nom) errors.nom = "Nom est requis";
    if (!formData.prenom) errors.prenom = "Prénom est requis";
    if (!formData.motDePasse) errors.motDePasse = "Mot de passe est requis";
    if (formData.enfants.length === 0) errors.enfants = "Au moins un élève doit être sélectionné";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await dispatch(ajouterParentAPI(formData, token));

      setFormData({
        login: "",
        nom: "",
        prenom: "",
        motDePasse: "",
        enfants: [],
      });
      setSelectedStudentId("");
      setFormErrors({});

      onSuccess();
    } catch (error) {
      console.error("Erreur d'ajout :", error);
      if (error.message.includes("Login utilisé")) {
        setFormErrors({ login: "Ce login est déjà utilisé" });
      } else {
        alert(error.message || "Erreur lors de l'ajout du parent");
      }
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md max-h-[90vh] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-6 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        <div className="p-5 max-h-[90vh] overflow-y-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Ajouter un parent</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["login", "nom", "prenom", "motDePasse"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field === "motDePasse"
                    ? "Mot de passe"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "motDePasse" ? "password" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    formErrors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors[field] && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors[field]}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enfants
              </label>
              <select
                onChange={handleStudentSelect}
                value={selectedStudentId}
                className={`w-full p-2 border rounded ${
                  formErrors.enfants ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Sélectionner un enfant</option>
                {availableEnfants.map((enfant) => (
                  <option key={enfant._id} value={enfant._id}>
                    {enfant.prenom} {enfant.nom} ({enfant.classe?.nom || "N/A"})
                  </option>
                ))}
              </select>
              {formErrors.enfants && (
                <p className="text-red-500 text-xs mt-1">{formErrors.enfants}</p>
              )}
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-200"
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

export default ModalAjoutParent;
