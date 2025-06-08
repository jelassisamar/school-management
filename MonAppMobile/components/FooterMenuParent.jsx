import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { logoutUser } from '../app/redux/actions/auth.actions';
import { useDispatch } from 'react-redux';

export default function FooterMenuParent({ navigation , eleveId  }) {
  const dispatch = useDispatch();
  

const handleLogout = async () => {
  const result = await dispatch(logoutUser());
  if (logoutUser.fulfilled.match(result)) {
    console.log("logout")
    navigation.navigate('Login');
   }
};

  return (
    <View style={styles.container} importantForAccessibility="yes">
      {/* Bouton Contact */}
      <TouchableOpacity 
        style={styles.sideButton}
        accessible={true}
        accessibilityLabel="Contact"
        accessibilityRole="button"
        onPress={() => navigation.navigate('ContactParent')}
      >
        <Image source={require('../assets/images/message.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Contact</Text>
      </TouchableOpacity>
 {/* Bouton Eleves */}
      <TouchableOpacity 
        style={styles.sideButton}
        onPress={() => navigation.navigate('Eleves')}
        accessible={true}
        accessibilityLabel="Élèves"
        accessibilityRole="button"
      >
        <Image source={require('../assets/images/user.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Élèves</Text>
      </TouchableOpacity>

      {/* Bouton Accueil */}
      <TouchableOpacity 
        style={styles.centerButton} 
        onPress={() => navigation.navigate('MenuPrincipalParent', { eleveId })}
        accessible={true}
        accessibilityLabel="Accueil"
        accessibilityRole="button"
      >
        <View style={styles.centerButtonContent}>
          <Image source={require('../assets/images/home.png')} style={[styles.icon, styles.centerIcon]} />
          <Text style={[styles.buttonText, styles.centerButtonText]}>Accueil</Text>
        </View>
      </TouchableOpacity>

      {/* Bouton Déconnexion */}
      <TouchableOpacity 
        style={styles.sideButton} 
        onPress={handleLogout}
        accessible={true}
        accessibilityLabel="Déconnexion"
        accessibilityRole="button"
      >
        <Image source={require('../assets/images/logout.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 80,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 5,
     elevation: 5,
    position: 'relative',
   
  },
  sideButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: 70,
  },
  centerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  centerButtonContent: {
    backgroundColor: '#366694',
    width: 90,
    height: 90,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#366694',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#366694',
    marginBottom: 4,
  },
  centerIcon: {
    tintColor: '#FFFFFF',
    width: 28,
    height: 28,
  },
  buttonText: {
    fontSize: 12,
    color: '#366694',
    fontWeight: '500',
    textAlign: 'center',
  },
  centerButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});



