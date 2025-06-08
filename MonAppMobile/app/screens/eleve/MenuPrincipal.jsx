import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from "react-redux";
import FooterMenu from '../../../components/FooterMenu';

const MenuPrincipal = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B4A5E" />
        <Text style={styles.loadingText}>Chargement du menu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Menu principal</Text>
          {user && (
            <View style={styles.userContainer}>
              <Image
                source={require('../../../assets/images/user.png')}
                style={styles.userImage}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.nom}</Text>
                <Text style={styles.userName}>{user.prenom}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Ligne 1 */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
             onPress={() => navigation.navigate('Resultats')}
          
          >
            <Image
              source={require('../../../assets/images/resultat.png')}
              style={styles.image}
            />
            <Text style={styles.cardText}>Résultats</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
           onPress={() => navigation.navigate('Emploi')}
          >
            <Image
              source={require('../../../assets/images/emploi.webp')}
              style={styles.image}
            />
            <Text style={styles.cardText}>Emploi du temps</Text>
          </TouchableOpacity>
        </View>

        {/* Ligne 2 */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
          onPress={() => navigation.navigate('Messages')}
          >
            <Image
              source={require('../../../assets/images/messagevert.jpg')}
              style={styles.image}
            />
            <Text style={styles.cardText}>Messages</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
 onPress={() => navigation.navigate('Absence')}
          >
            <Image
              source={require('../../../assets/images/absence.png')}
              style={styles.image}
            />
            <Text style={styles.cardText}>Absences</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

     <FooterMenu navigation={navigation}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderWidth: 8,
    borderColor: '#8B4A5E',
    borderRadius: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#8B4A5E',
  },
  header: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    fontStyle: 'italic',
    color: '#8B4A5E',
    marginBottom: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEDF6',
    padding: 15,
    borderRadius: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#355370',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    width: '48%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#8B4A5E',
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default MenuPrincipal;