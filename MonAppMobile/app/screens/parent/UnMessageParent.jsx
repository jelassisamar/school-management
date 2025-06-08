import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import FooterMenuParent from '../../../components/FooterMenuParent';
import { useSelector } from "react-redux";

const UnMessageParent = ({navigation}) => {
  const [loading, setLoading] = useState(true);


  // Add this effect to ensure navigation is ready
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
        <Text style={styles.loadingText}>Chargement du Message...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Message</Text>
        <Image
          source={require('../../../assets/images/messagevert.jpg')}
          style={styles.logo}
        />
      </View>

      <View style={styles.main}>
        <Text style={styles.titre}>Titre du message</Text>

        <View style={styles.contenu}>
          <Text style={styles.messageText}>
            Ceci est le contenu du message. Il peut inclure des informations importantes pour l'élève telles que les devoirs, des annonces de l’école, ou d'autres détails pertinents.
          </Text>
        </View>

        <Text style={styles.date}>dd-mm-yyyy à hh:mm:ss</Text>
      </View>

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
    paddingTop: 40,
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
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  titre: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  contenu: {
    backgroundColor: '#EAEDF6',
    borderRadius: 10,
    padding: 15,
    minHeight: 200,
    justifyContent: 'center',
    marginBottom: 15,
  },
  messageText: {
    fontSize: 16,
    color: '#444',
  },
  date: {
    fontSize: 14,
    color: 'red',
    alignSelf: 'flex-end',
  },
});

export default UnMessageParent;
