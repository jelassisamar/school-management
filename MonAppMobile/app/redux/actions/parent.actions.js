import { PARENT_API } from "../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchParentWithChildren = createAsyncThunk(
  "parent/fetchParentWithChildren",
  async (parentId, { rejectWithValue }) => {
    try {
      // 1. Récupération du token de manière asynchrone
      const token = await AsyncStorage.getItem("token");

      // 2. Vérification de la présence du token
      if (!token) {
        return rejectWithValue("Token d'authentification manquant");
      }

      // 3. Configuration de la requête
      const response = await fetch(`${PARENT_API}/${parentId}/enfants`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // 4. Traitement de la réponse
      const responseData = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          responseData.message || "Échec de la récupération des données parent"
        );
      }

      // 5. Retour des données formatées
      return responseData.data || responseData;
    } catch (error) {
      // 6. Gestion des erreurs
      console.error("Erreur fetchParentWithChildren:", error);
      return rejectWithValue(error.message || "Erreur de connexion au serveur");
    }
  }
);
