import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import FooterMenuParent from '../../../components/FooterMenuParent';

const AbsenceParent = ({navigation}) => {

  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([
    { name: 'Mathématiques', hours: '48.00 H', absence: '4.50 H' },
    { name: 'Physique-Chimie', hours: '36.00 H', absence: '2.00 H' },
    { name: 'Français', hours: '42.00 H', absence: '1.30 H' },
    { name: 'Histoire-Géographie', hours: '30.00 H', absence: '0.00 H' },
    { name: 'Anglais', hours: '32.00 H', absence: '3.15 H' }
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
        <ActivityIndicator size="large" color="#355370" />
        <Text style={styles.loadingText}>Chargement des absences...</Text>
      </View>
    );
  }

  return (
   
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Absences</Text>
            <Image
              source={require('../../../assets/images/absence.png')}
              style={styles.logo}
            />
          </View>

          <View style={styles.content}>
            {subjects.map((subject, index) => (
              <View key={index} style={styles.subjectCard}>
                <Text style={styles.subjectTitle}>{subject.name}</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Charge horaire :</Text>
                  <Text style={styles.infoValue}>{subject.hours}</Text>
                </View>
                <View style={styles.absenceContainer}>
                  <Text style={styles.absenceLabel}>Heures d'absence :</Text>
                  <Text style={[
                    styles.absenceValue,
                    subject.absence !== '0.00 H' && styles.absenceHighlight
                  ]}>
                    {subject.absence}
                  </Text>
                </View>
              </View>
            ))}
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
    backgroundColor: '#F5F5F5'
  },
  loadingText: {
    marginTop: 15,
    fontSize: 18,
    color: '#355370',
    fontWeight: '500'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 8,
    borderColor: '#355370',
    borderRadius: 10
  },
  scrollContent: {
    paddingBottom: 80
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 0,
  },
  title: {
    fontSize: 30,
    fontStyle: 'italic',
    color: '#355370',
    marginRight: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  content: {
    padding: 15,
    paddingTop: 10
  },
  subjectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  subjectTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B4A5E',
    marginBottom: 10
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 5
  },
  infoLabel: {
    fontSize: 16,
    color: '#555555',
    fontWeight: '500'
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4A5E'
  },
  absenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 5,
    alignItems: 'center'
  },
  absenceLabel: {
    fontSize: 16,
    color: '#355370',
    fontWeight: '500'
  },
  absenceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#355370'
  },
  absenceHighlight: {
    color: '#FF5252' // Rouge pour les absences
  },
});

export default AbsenceParent;
