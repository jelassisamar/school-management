import { STUDENT_API } from "../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchStudentById = createAsyncThunk(
  "student/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      // Récupération du token depuis AsyncStorage
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return rejectWithValue("Aucun token d'authentification trouvé");
      }

      const response = await fetch(`${STUDENT_API}/${id}/getinfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Vérification de la réponse HTTP
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Erreur lors de la récupération de l'élève"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Gestion des erreurs réseau et autres exceptions
      console.error("Erreur fetchStudentById:", error);
      return rejectWithValue(error.message || "Erreur de connexion au serveur");
    }
  }
);
