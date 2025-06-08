import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_API } from "../utils/api";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ login, motDePasse }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AUTH_API}/login`, {
        login,
        motDePasse,
      });

      const { token, user } = response.data;

      // Enregistrement local
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      return { token, user };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur de connexion"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().auth.token;

      // Appel API de déconnexion
      await axios.post(
        `${AUTH_API}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Nettoyage du stockage local
      await AsyncStorage.multiRemove(["token", "user"]);

      // Retourne les données nettoyées
      return { user: null, token: null };
    } catch (error) {
      // En cas d'erreur, on nettoie quand même le state local
      await AsyncStorage.multiRemove(["token", "user"]);
      return rejectWithValue(
        error.response?.data?.message || "Erreur de déconnexion"
      );
    }
  }
);
