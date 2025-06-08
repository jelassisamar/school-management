import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/auth.actions';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const [login, setLogin] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  useEffect(() => {
    if (error) {
      Alert.alert('Erreur', error);
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('User:', user.role);
      if (user.role === 'eleve') {
        navigation.replace('MenuPrincipal');
      } else if (user.role === 'parent') {
        navigation.replace('Eleves');
      }
    }
  }, [isAuthenticated, user, navigation]);

  const handleLogin = () => {
    if (!login || !motDePasse) {
      Alert.alert('Erreur', 'Veuillez entrer un login et un mot de passe.');
      return;
    }

    dispatch(loginUser({ login, motDePasse }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B4A5E" />
        <Text style={styles.loadingText}>Connexion...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.titleText}>Authentification</Text>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Entrer votre login</Text>
        <TextInput
          style={styles.input}
          value={login}
          onChangeText={setLogin}
          placeholder="Login d'utilisateur"
        />

        <Text style={styles.label}>Entrer votre mot de passe</Text>
        <TextInput
          style={styles.input}
          value={motDePasse}
          onChangeText={setMotDePasse}
          placeholder="Mot de passe"
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Connexion...' : 'Se connecter →'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  loadingText: { marginTop: 15, fontSize: 18, color: '#8B4A5E', fontWeight: '500' },
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  titleText: { fontSize: 40, color: '#8B4A5E', marginTop: 10, fontStyle: 'italic', marginBottom: 40 },
  logoContainer: { alignItems: 'center', marginTop: 50, marginBottom: 40 },
  logo: { width: 200, height: 200 },
  formContainer: { flex: 1 },
  label: { fontSize: 16, color: '#8B4A5E', marginBottom: 8, fontWeight: 'bold' },
  input: { height: 50, borderRadius: 20, paddingHorizontal: 15, marginBottom: 20, fontSize: 16, backgroundColor: '#EAEDF6' },
  button: { backgroundColor: '#8B4A5E', paddingHorizontal: 60, paddingVertical: 15, borderRadius: 50, alignItems: 'center', marginTop: 50 },
  buttonText: { color: '#FFFFFF', fontSize: 20 },
});

export default Login;