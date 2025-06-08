import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { logoutUser } from '../app/redux/actions/auth.actions';
import { useDispatch } from 'react-redux';

export default function FooterMenu({ navigation }) {
  const dispatch = useDispatch();
   

const handleLogout = async () => {
  const result = await dispatch(logoutUser());
  if (logoutUser.fulfilled.match(result)) {
    console.log("logout")
    navigation.navigate('Login');
   }
};


  return (
    <View style={styles.container}>
      {/* Bouton Contact */}
      <TouchableOpacity style={styles.sideButton}  onPress={() => navigation.navigate('Contact')}>
        <Image source={require('../assets/images/message.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Contact</Text>
      </TouchableOpacity>

      {/* Bouton Accueil */}
      <TouchableOpacity style={styles.centerButton}  onPress={() => navigation.navigate('MenuPrincipal')} >
        <View style={styles.centerButtonContent}>
          <Image source={require('../assets/images/home.png')} style={[styles.icon, styles.centerIcon]} />
          <Text style={[styles.buttonText, styles.centerButtonText]}>Accueil</Text>
        </View>
      </TouchableOpacity>

      {/* Bouton Déconnexion */}
      <TouchableOpacity style={styles.sideButton} onPress={handleLogout}>
        <Image source={require('../assets/images/logout.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 80,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 15,
    elevation: 5,
    position: 'relative',
  },
  sideButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  centerButton: {
    position: 'absolute',
    left: '50%',
    marginLeft: -40, // -width/2 to center the button
    bottom: 20,
    alignItems: 'center',
  },
  centerButtonContent: {
    backgroundColor: '#8B4A5E',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B4A5E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: '#8B4A5E',
    marginBottom: 4,
  },
  centerIcon: {
    tintColor: '#FFFFFF',
    width: 20,
    height: 30,
  },
  buttonText: {
    fontSize: 12,
    color: '#8B4A5E',
    fontWeight: '500',
    textAlign: 'center',
  },
  centerButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});
