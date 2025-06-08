import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import FooterMenu from '../../../components/FooterMenu';

const Contact = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setError('');
    setModalVisible(true);
    setSubject('');
    setMessage('');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B4A5E" />
        <Text style={styles.loadingText}>Chargement ...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contact</Text>
        <Image
          source={require('../../../assets/images/messagerose.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Contacter-nous</Text>

        <TextInput
          style={styles.input}
          placeholder="écrire l'objet de votre message ici"
          placeholderTextColor="#000000"
          value={subject}
          onChangeText={setSubject}
        />

        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="écrire votre message ici"
          placeholderTextColor="#000000"
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
        />

        {error !== '' && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
  <FooterMenu navigation={navigation}/>

      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Message envoyé !</Text>
            <Text style={styles.modalText}>Votre message a bien été transmis.</Text>
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
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#8B4A5E',
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
    fontSize: 30,
    fontStyle: 'italic',
    color: '#8B4A5E',
    marginRight: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#355370'
  },
  input: {
    borderWidth: 2,
    borderColor: '#8B4A5E',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    color: '#000000',
    fontSize: 16,
  },
  messageInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  sendButton: {
    backgroundColor: '#009514',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 50,
  },
  sendButtonText: {
    color: 'white',
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
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#8B4A5E',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  modalButton: {
    backgroundColor: '#8B4A5E',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Contact;