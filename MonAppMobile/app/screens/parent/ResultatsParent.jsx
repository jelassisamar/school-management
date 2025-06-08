import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';

import { useSelector } from "react-redux";
import { router } from 'expo-router';
import FooterMenuParent from '../../../components/FooterMenuParent';
const ResultatsParent = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([
    {
      subject: 'Mathématiques',
      notes: ['15.50', '16.25'],
      moyenne: '15.63'
    },
    {
      subject: 'Physique-Chimie', 
      notes: ['14.00', '17.25'],
      moyenne: '14.92'
    },
    {
      subject: 'Français',
      notes: ['12.00', '16.50'],
      moyenne: '14.25'
    }
  ]);

  
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
        <ActivityIndicator size="large" color="#355370"/>
        <Text style={styles.loadingText}>Chargement en cours...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Résultats</Text>
          <Image
            source={require('../../../assets/images/resultat.png')}
            style={styles.logo}
          />
        </View>
      
        <View style={styles.content}>

       <View style={styles.generale}>
       <Text style={styles.moyennegL}>MOYENNE</Text>
       <Text style={styles.moyennegLr}>00.00</Text>
       </View>
          {results.map((result, index) => (
            <View key={index} style={styles.subjectCard}>
              <View style={styles.subjectHeader}>
                <Text style={styles.subjectTitle}>{result.subject}</Text>
                <View style={styles.moyenneContainer}>
                  <Text style={styles.moyenneLabel}>MOYENNE</Text>
                  <Text style={styles.moyenneValue}>{result.moyenne}</Text>
                </View>
              </View>
              
              <View style={styles.notesContainer}>
                {result.notes.map((note, noteIndex) => (
                  <View key={noteIndex} style={styles.noteItem}>
                    <Text style={styles.noteLabel}>Note {noteIndex + 1}</Text>
                    <Text style={styles.noteValue}>{note}</Text>
                  </View>
                ))}
              </View>
              
              {index < results.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
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
    backgroundColor: '#FFFFFF'
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
    borderRadius: 10
  },
  scrollContainer: {
    paddingBottom: 80
  },


    generale: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E0E0E0'
    },
    moyennegL: {
      fontSize: 18,
      fontWeight: '600',
      color: '#366694',
      textTransform: 'uppercase',
      letterSpacing: 0.5
    },
    moyennegLr: {
      fontSize: 24,
      fontWeight: '700',
      color: '#2E7D32', // Vert pour indiquer un résultat
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      minWidth: 80,
      textAlign: 'center'
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
    fontSize: 30,
    fontStyle: 'italic',
    color: '#8B4A5E',
    marginRight: 20,
    fontWeight: 'bold'
  },
  logo: {
    width: 60,
    height: 60
  },
  content: {
    flex: 1,
    padding: 15
  },
  subjectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  subjectTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#355370'
  },
  moyenneContainer: {
    alignItems: 'center'
  },
  moyenneLabel: {
    fontSize: 12,
    color: '#8B4A5E',
    fontWeight: 'bold'
  },
  moyenneValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B4A5E'
  },
  notesContainer: {
    marginTop: 10
  },
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  noteLabel: {
    fontSize: 16,
    color: '#555555'
  },
  noteValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#355370'
  },
  separatorTop: {
    height: 3,
    backgroundColor: '#8B4A5E',
    marginHorizontal: 20,
    opacity: 0.5
  },
  separator: {
    height: 2,
    backgroundColor: '#EAEDF6',
    marginVertical: 15,
    marginHorizontal: -15
  }
});

export default ResultatsParent;