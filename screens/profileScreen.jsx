import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Alert, SafeAreaView, Text, TouchableOpacity,
} from 'react-native';
import ManageChat from '../utils/manageChat';
import {
  addContact,
  blockContact,
  getContacts,
  removeContact,
  unblockContact,
} from '../services/api';
import getContactStatus from '../utils/contactStatus';
import styles from '../styles/styles';

function ContactProfile({ route }) {
  const navigation = useNavigation();
  const { contact } = route.params;
  const [contactStatus, setContactStatus] = useState(null);

  const fetchContactStatus = useCallback(async () => {
    try {
      const status = await getContactStatus(contact.user_id);
      setContactStatus(status);
    } catch (error) {
      console.error('Error fetching contact status:', error);
    }
  }, [contact.user_id]);

  useEffect(() => {
    fetchContactStatus();
  }, [fetchContactStatus]);

  const handleChatPress = useCallback(async () => {
    console.log('contact:', contact);
    if (contactStatus === 'added') {
      // Chat with the contact
      ManageChat(navigation, contact);
    } else {
      // Add the contact first and then chat
      try {
        const addUser = await addContact(contact.user_id);
        if (addUser.status === 400) {
          alert('You cannot add yourself as a contact.');
        } else {
          fetchContactStatus();
          ManageChat(navigation, contact);
        }
      } catch (error) {
        console.error('Error adding contact:', error);
      }
    }
  }, [navigation, contact, contactStatus, fetchContactStatus]);

  const handleAddContactPress = async () => {
    try {
      const addUser = await addContact(contact.user_id);
      if (addUser.status === 400) {
        alert('You cannot add yourself as a contact.');
      } else {
        fetchContactStatus();
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleBlockContactPress = async () => {
    try {
      await blockContact(contact.user_id);
      fetchContactStatus();
    } catch (error) {
      console.error('Error blocking contact:', error);
    }
  };

  const handleRemoveContactPress = async () => {
    try {
      await removeContact(contact.user_id);
      fetchContactStatus();
    } catch (error) {
      console.error('Error removing contact:', error);
    }
  };

  const handleUnblockContactPress = async () => {
    try {
      await unblockContact(contact.user_id);
      fetchContactStatus();
    } catch (error) {
      console.error('Error unblocking contact:', error);
    }
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <Text style={styles.nameText}>{contact.given_name} {contact.family_name}</Text>
      <Text style={styles.emailText}>Email: {contact.email}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleChatPress}
        accessible
        accessibilityLabel="Chat Button"
      >
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>

      {contactStatus === 'not_added' && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddContactPress}
          accessible
          accessibilityLabel="Add Contact Button"
        >
          <Text style={styles.buttonText}>Add Contact</Text>
        </TouchableOpacity>
      )}

      {contactStatus === 'added' && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleRemoveContactPress}
          accessible
          accessibilityLabel="Remove Contact Button"
        >
          <Text style={styles.buttonText}>Remove Contact</Text>
        </TouchableOpacity>
      )}

      {contactStatus === 'blocked' && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleUnblockContactPress}
          accessible
          accessibilityLabel="Unblock Contact Button"
        >
          <Text style={styles.buttonText}>Unblock Contact</Text>
        </TouchableOpacity>
      )}

      {contactStatus === 'added' && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleBlockContactPress}
          accessible
          accessibilityLabel="Block Contact Button"
        >
          <Text style={styles.buttonText}>Block Contact</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
export default ContactProfile;
