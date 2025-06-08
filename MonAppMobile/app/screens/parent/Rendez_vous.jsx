import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import FooterMenuParent from '../../../components/FooterMenuParent';

const Rendez_vous = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [personName, setPersonName] = useState('');
  const [subject, setSubject] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');

  
  
    // Add this effect to ensure navigation is ready
    useEffect(() => {
      const timer = setTimeout(() => {
       
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }, []);
  

  

  const handleSend = () => {
    if (!personName.trim() || !subject.trim()) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setError('');
    setModalVisible(true);
    setPersonName('');
    setSubject('');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#355370" />
        <Text style={styles.loadingText}>Chargement ...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Prendre un rendez-vous</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Avec qui?</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Écrire le nom de la personne que vous voulez voir"
            placeholderTextColor="#888"
            value={personName}
            onChangeText={setPersonName}
          />

          <Text style={styles.inputLabel}>Quel est l'objet de ce rendez-vous ?</Text>
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Écrire l'objet de ce rendez-vous"
            placeholderTextColor="#888"
            multiline
            numberOfLines={3}
            value={subject}
            onChangeText={setSubject}
          />

          {error !== '' && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Envoyer</Text>
            </TouchableOpacity>
            
           
          </View>
        </View>
      </ScrollView>
   <FooterMenuParent  navigation={navigation} />

      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image
              source={require('../../../assets/images/success.png')}
              style={styles.successIcon}
            />
            <Text style={styles.modalTitle}>Demande envoyée !</Text>
            <Text style={styles.modalText}>Votre demande de rendez-vous a bien été transmise.</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginTop: 10,
    fontSize: 16,
    color: '#355370',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderWidth: 8,
    borderColor: '#355370',
    borderRadius: 10,
  },
  scrollContent: {
    paddingBottom: 80
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEDF6'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#355370',
    textAlign: 'center',
    marginBottom: 10,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 15,
    backgroundColor: '#FFFFFF',
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#355370',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: '#355370',
    marginBottom: 8,
    fontWeight: '500'
  },
  input: {
    borderWidth: 1,
    borderColor: '#8B4A5E',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize: 16,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#FF5252',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  sendButton: {
    backgroundColor: '#8B4A5E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#355370',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  successIcon: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#355370',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  modalButton: {
    backgroundColor: '#8B4A5E',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Rendez_vous;