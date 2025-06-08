import { createAsyncThunk } from "@reduxjs/toolkit";
import { EMPLOI_API } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchEmploiByClasseId = createAsyncThunk(
  "emploi/fetchByClasseId",
  async (classId, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return rejectWithValue("Token d'authentification manquant");
      }

      const response = await fetch(`${EMPLOI_API}/classe/${classId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Erreur lors de la récupération de l'emploi"
        );
      }

      const data = await response.json();
      console.log("Réponse backend emploi =>", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Erreur inconnue");
    }
  }
);
