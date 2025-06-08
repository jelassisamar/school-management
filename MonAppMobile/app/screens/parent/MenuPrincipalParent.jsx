import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import FooterMenuParent from '../../../components/FooterMenuParent';
import { useRoute } from '@react-navigation/native';
import { fetchStudentById } from '../../redux/actions/student.actions';

const MenuPrincipalParent = ({navigation}) => {
  const route = useRoute();

  const { eleveId } = route.params;
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.student);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eleveId) {
      dispatch(fetchStudentById(eleveId));
    }
  }, [dispatch, eleveId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#355370" />
        <Text style={styles.loadingText}>Chargement du menu...</Text>
      </View>
    );
  }

  return (

<View
  style={styles.container}
  accessibilityElementsHidden={false}
  importantForAccessibility="yes"
>
  <ScrollView
    contentContainerStyle={styles.scrollContent}
    accessibilityElementsHidden={false}
    importantForAccessibility="yes"
  >
         <View style={styles.header}>
          <Text style={styles.title}>Menu principal</Text>
          {student && (
            <View style={styles.userContainer}>
              <Image
                source={require('../../../assets/images/user.png')}
                style={styles.userImage}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{student.nom}</Text>
                <Text style={styles.userName}>{student.prenom}</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.gridContainer}>
          {/* Ligne 1 */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.card}
             onPress={() => navigation.navigate('ResultatsParent',{eleveId})}
             >
              <Image
                source={require('../../../assets/images/resultat.png')}
                style={styles.image}
              />
              <Text style={styles.cardText}>Résultats</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}  onPress={() => navigation.navigate('EmploiParent',{eleveId})}>
              <Image
                source={require('../../../assets/images/emploi.webp')}
                style={styles.image}
              />
              <Text style={styles.cardText}>Emploi du temps</Text>
            </TouchableOpacity>
          </View>

          {/* Ligne 2 */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.card}
            onPress={() => navigation.navigate('MessagesParent',{eleveId})}
            >
              <Image
                source={require('../../../assets/images/messagevert.jpg')}
                style={styles.image}
              />
              <Text style={styles.cardText}>Messages</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}
             onPress={() => navigation.navigate('AbsenceParent',{eleveId})}>
              <Image
                source={require('../../../assets/images/absence.png')}
                style={styles.image}
              />
              <Text style={styles.cardText}>Absences</Text>
            </TouchableOpacity>
          </View>

          {/* Carte pleine largeur */}
          <TouchableOpacity
            style={styles.fullWidthCard}
            onPress={() => navigation.navigate('Rendez_vous')}
          >
            <Image
              source={require('../../../assets/images/rendez-vous.png')}
              style={styles.cardImage}
            />
            <Text style={styles.fullWidthCardText}>Demander un Rendez-vous</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FooterMenuParent navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
 loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#355370',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 8,
    borderColor: '#366694',
    borderRadius: 10,
  },


  header: {
    padding: 20,
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    fontStyle: 'italic',
    color: '#366694',
    marginBottom: 15,
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
  gridContainer: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  fullWidthCard: {
    backgroundColor: 'white',
    width: '100%',
    height: 80,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: 50,
    height: 50,
    marginRight: 15,
    resizeMode: 'contain',
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#366694',
    textAlign: 'center',
  },
  fullWidthCardText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#366694',
  },
});



export default MenuPrincipalParent;