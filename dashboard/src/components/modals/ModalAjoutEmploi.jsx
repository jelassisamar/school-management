// src/components/ModalAjoutEmploi.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassesAPI } from '../../redux/actions/classe.actions';
import { addEmploiAPI } from '../../redux/actions/emploi.actions';

const ModalAjoutEmploi = ({onClose, onSuccessAjout  }) => {
  const dispatch = useDispatch();
  const storedToken = localStorage.getItem('token');

  const { classes, loading, error } = useSelector((state) => state.classe);

  const [formData, setFormData] = useState({
    classe: '',
    date: '',
    image: null,
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (storedToken) {
      dispatch(getClassesAPI(storedToken));
    }
  }, [dispatch, storedToken]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.classe) errors.classe = 'La classe est requise.';
    if (!formData.date) errors.date = 'La date est requise.';
    if (!formData.image) errors.image = 'L’image est requise.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    const formPayload = new FormData();
    formPayload.append("idClasse", formData.classe);
    formPayload.append("date", formData.date);
    formPayload.append("image", formData.image);

    try {
      await dispatch(addEmploiAPI(formPayload)); // Assure-toi que cette action retourne une Promise
      if (onSuccessAjout) onSuccessAjout(); // Appel du callback de succès
    } catch (error) {
      window.alert("Erreur lors de l'ajout.");
    }
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Ajouter un emploi</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Classe */}
          <div>
            <label className="block text-sm font-medium mb-1">Classe :</label>
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
                  formErrors.classe ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionnez une classe</option>
                {classes &&
                  classes.map((classe) => (
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

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date :</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                formErrors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.date && (
              <p className="text-red-500 text-xs mt-1">{formErrors.date}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-1">Image :</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                formErrors.image ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.image && (
              <p className="text-red-500 text-xs mt-1">{formErrors.image}</p>
            )}
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAjoutEmploi;
