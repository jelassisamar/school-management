import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch(); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userData = await AsyncStorage.getItem('user');

        if (token && userData) {
          const user = JSON.parse(userData);

          // Met à jour le state Redux manuellement
          dispatch({ type: 'auth/login/fulfilled', payload: { token, user } });

          // Redirige selon le rôle
          if (user.role === 'eleve') {
            navigation.replace('MenuPrincipal');
          } else if (user.role === 'parent') {
            navigation.replace('Eleves');
          } else {
            navigation.replace('Login'); // fallback
          }
        } else {
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Erreur de chargement du token/user :', error);
        navigation.replace('Login');
      }
    };

    setTimeout(checkAuth, 2000); // délai d’affichage du splash screen
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Mon Lycée</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B4A5E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    borderRadius: 90,
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#fff',
  },
});
