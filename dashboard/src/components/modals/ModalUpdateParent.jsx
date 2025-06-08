import React, { useState } from "react"; 
import { useDispatch } from "react-redux";
import { updateParentAPI, getParentsAPI } from "../../redux/actions/parent.actions";

const ModalUpdateParent = ({ isOpen, onClose, parentData, token }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    ...parentData,
    motDePasse: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSend = { ...formData };
      if (!dataToSend.motDePasse) {
        delete dataToSend.motDePasse;
      }
      await dispatch(updateParentAPI(parentData._id, dataToSend, token));
      await dispatch(getParentsAPI(token));
      alert("Parent mis à jour avec succès !");
      onClose();
    } catch (err) {
      alert(
        "Erreur lors de la mise à jour du parent : " +
          (err.response?.data?.message || err.message || "Erreur inconnue")
      );
      setError("Erreur lors de la mise à jour du parent.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-md">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
        <h3 className="text-xl font-bold mb-4">Modifier le Parent</h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Nom */}
          <div className="mb-4">
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 capitalize">
              Nom
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom || ""}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>

          {/* Prénom */}
          <div className="mb-4">
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 capitalize">
              Prénom
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom || ""}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>

          {/* Login */}
          <div className="mb-4">
            <label htmlFor="login" className="block text-sm font-medium text-gray-700 capitalize">
              Login
            </label>
            <input
              type="text"
              id="login"
              name="login"
              value={formData.login || ""}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>



          {/* Mot de passe */}
          <div className="mb-4">
            <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-700 capitalize">
              Mot de passe
            </label>
            <input
              type="password"
              id="motDePasse"
              name="motDePasse"
              value={formData.motDePasse || ""}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
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

export default ModalUpdateParent;
