import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { fetchStudentById } from '../../redux/actions/student.actions';
import { fetchEmploiByClasseId } from '../../redux/actions/emploi.actions';
import FooterMenuParent from '../../../components/FooterMenuParent';

const EmploiParent = ({ navigation }) => {
  const dispatch = useDispatch();
  const route = useRoute();

  const { eleveId } = route.params;
  console.log("id", eleveId);

  const { student, loading: studentLoading } = useSelector((state) => state.student);
  const { emploi, loading: emploiLoading, error } = useSelector((state) => state.emploi);

  useEffect(() => {
    if (eleveId) {
      dispatch(fetchStudentById(eleveId));
    }
  }, [dispatch, eleveId]);

  useEffect(() => {
    if (student?.classe?._id) {
      dispatch(fetchEmploiByClasseId(student.classe._id));
    }
  }, [dispatch, student]);

  if (studentLoading || emploiLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#366694" />
        <Text style={styles.loadingText}>Chargement de l'emploi du temps...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  if (!emploi) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Aucun emploi du temps disponible.</Text>
      </View>
    );
  }

  const formattedDate = new Date(emploi.date).toLocaleDateString('fr-FR');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emploi du temps - {student?.prenom} {student?.nom}</Text>
        <Image source={require('../../../assets/images/emploi.webp')} style={styles.logo} />
      </View>

      <View style={styles.main}>
        <Text style={styles.day}>
          Date : <Text style={styles.bold}>{formattedDate}</Text>
        </Text>
        <View style={styles.emploi}>
          <Image
            source={{ uri: `http://192.168.97.150:5000/${emploi.image}` }}
            style={styles.image}
            resizeMode="contain"
            onError={(e) => console.log('Erreur de chargement de l\'image:', e.nativeEvent.error)}
          />
        </View>
      </View>

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
    color: '#366694',
    textAlign: 'center',
  },
  container: {
    marginTop:8,
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 8,
    borderColor: '#366694',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontStyle: 'italic',
    color: '#366694',
    marginRight: 15,
  },
  logo: {
    width: 50,
    height: 50,
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  day: {
    fontSize: 18,
    marginBottom: 10,
    color: '#444',
  },
  bold: {
    fontWeight: 'bold',
  },
  emploi: {
    width: '100%',
    height: 450,
    backgroundColor: '#EAEDF6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default EmploiParent;