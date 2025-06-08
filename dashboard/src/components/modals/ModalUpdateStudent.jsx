import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStudentAPI } from "../../redux/actions/student.actions";
import { getClassesAPI } from "../../redux/actions/classe.actions";

const ModalUpdateStudent = ({ isOpen, onClose, studentData }) => {
  const dispatch = useDispatch();
  const { classes = [], loading: classesLoading, error: classesError } = useSelector((state) => state.classe);
  const { loading, error } = useSelector((state) => state.student);
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
    if (isOpen && storedToken) {
      dispatch(getClassesAPI(storedToken));
    }
  }, [isOpen, dispatch, storedToken]);

  useEffect(() => {
    if (studentData) {
      setFormData({
        login: studentData.login || "",
        nom: studentData.nom || "",
        prenom: studentData.prenom || "",
        motDePasse: "", // Keep password field empty
        dateNaissance: studentData.dateNaissance?.split('T')[0] || "",
        classe: studentData.classe?._id || studentData.classe || "",
      });
    }
  }, [studentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
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

    dispatch(updateStudentAPI(studentData._id, formData, storedToken))
      .then(() => {
        setFormErrors({});
        onClose();
        alert("Élève mis à jour avec succès !");
      })
      .catch((err) => {
        alert(
          "Erreur lors de la mise à jour de l'élève : " +
            (err.response?.data?.message || err.message)
        );
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Modifier l'Élève</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
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
                required
              />
              {formErrors[field] && (
                <p className="text-red-500 text-xs mt-1">{formErrors[field]}</p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Classe
            </label>
            {classesLoading ? (
              <div className="p-2 border border-gray-300 rounded bg-gray-100 text-gray-500">
                Chargement des classes...
              </div>
            ) : classesError ? (
              <div className="p-2 border border-red-300 rounded bg-red-100 text-red-500">
                Erreur : {classesError}
              </div>
            ) : (
              <select
                name="classe"
                value={formData.classe}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  formErrors.classe ? "border-red-500" : "border-gray-300"
                }`}
                required
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

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "En cours..." : "Mettre à jour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateStudent;