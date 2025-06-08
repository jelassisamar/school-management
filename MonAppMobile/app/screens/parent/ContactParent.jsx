import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import FooterMenuParent from '../../../components/FooterMenuParent';

const ContactParent = ({navigation}) => {
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
        <Text style={styles.inputLabel}>Objet du message</Text>
        <TextInput
          style={styles.input}
          placeholder="Écrire l'objet de votre message ici"
          placeholderTextColor="#888"
          value={subject}
          onChangeText={setSubject}
        />

        <Text style={styles.inputLabel}>Votre message</Text>
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Écrire votre message ici"
          placeholderTextColor="#888"
          multiline
          numberOfLines={5}
          value={message}
          onChangeText={setMessage}
        />

        {error !== '' && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Envoyer le message</Text>
        </TouchableOpacity>
      </View>

      <FooterMenuParent navigation={navigation} />

      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image
              source={require('../../../assets/images/success.png')}
              style={styles.successIcon}
            />
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
    flexDirection: 'row',
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
    height: 150,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#FF5252',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  sendButton: {
    backgroundColor: '#8B4A5E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
    shadowColor: '#8B4A5E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  sendButtonText: {
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

export default ContactParent;