import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import FooterMenu from '../../../components/FooterMenu';
import { useSelector, useDispatch } from "react-redux";
import { fetchEmploiByClasseId } from "../../redux/actions/emploi.actions";

const Emploi = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const { emploi, loading, error } = useSelector((state) => state.emploi);
  const dispatch = useDispatch();

useEffect(() => {
  console.log("user", user);
  if (user?.classe) {
    dispatch(fetchEmploiByClasseId(user.classe));
  }
}, [user, dispatch]);

if (loading) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#8B4A5E" />
      <Text style={styles.loadingText}>Chargement de l'emploi du temps...</Text>
    </View>
  );
}

if (error) {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Erreur : {error}</Text>
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
      <Text style={styles.title}>Emploi du temps</Text>
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
        />
      </View>
    </View>

    <FooterMenu navigation={navigation}/>
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
    color: '#8B4A5E',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 8,
    borderColor: '#8B4A5E',
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
    color: '#8B4A5E',
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

export default Emploi;
