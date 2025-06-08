import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateClasseAPI, getClassesAPI } from "../../redux/actions/classe.actions";

const ModalUpdateClasse = ({ isOpen, onClose, parentData, token }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ nom: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (parentData) {
      setFormData({ nom: parentData.nom || "" });
    }
  }, [parentData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await dispatch(updateClasseAPI(parentData._id, formData, token));
      await dispatch(getClassesAPI(token));
      onClose();
    } catch (err) {
      setError(err.message || "Erreur lors de la mise à jour");
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-md">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
        <h3 className="text-xl font-bold mb-4">Modifier la classe</h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 capitalize">
              Nom
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Mise à jour..." : "Mettre à jour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateClasse;
