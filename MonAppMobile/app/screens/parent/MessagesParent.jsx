import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, ScrollView } from 'react-native';
import FooterMenuParent from '../../../components/FooterMenuParent';


const MessagesParent = ({navigation}) => {
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
        <ActivityIndicator size="large" color="#355370"/>
        <Text style={styles.loadingText}>Chargement des Messages...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Messages</Text>
        <Image
          source={require('../../../assets/images/messagevert.jpg')}
          style={styles.logo}
        />
      </View>

      <ScrollView contentContainerStyle={styles.main}>
        <View style={styles.message}>
          <View style={styles.messageHeader}>
            <Text style={styles.titre}>Titre du message</Text>
            <Text style={styles.date}>dd-mm-yyyy à hh:mm:ss</Text>
          </View>

          <View style={styles.contenu}>
            <Text style={styles.titre2}>Voici le contenu de ce message important reçu par l’élève. Il peut contenir des informations sur les devoirs, les annonces, etc.</Text>
          </View>

          <TouchableOpacity
            style={styles.ouvrirContainer}
         onPress={() => navigation.navigate('UnMessageParent')}
          >
            <Text style={styles.ouvrir}>Ouvrir</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

       <FooterMenuParent  navigation={navigation} />
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
    borderColor: '#355370',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,

  },
  title: {
    fontSize: 28,
    fontStyle: 'italic',
    color: '#355370',
    marginRight: 15,
  },
  logo: {
    width: 50,
    height: 50,
  },
  main: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  message: {
    backgroundColor: '#EAEDF6',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  messageHeader: {
    marginBottom: 10,
  },
  titre: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  contenu: {
    backgroundColor: '#DADDE6',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  titre2: {
    fontSize: 15,
    color: '#444',
  },
  ouvrirContainer: {
    alignItems: 'flex-end',
  },
  ouvrir: {
    color: '#009514',
    textDecorationLine: 'underline',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default MessagesParent;
