import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getContacts, getBlockedContacts } from '../services/api';
import ContactComponent from '../components/contactComponent';

function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const handleContact = async (contact) => {
    try {
      console.log(contact);
      navigation.navigate('ProfileScreen', { contact: contact });
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchBlockedContacts = async () => {
    try {
      const data = await getBlockedContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching blocked contacts:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params && route.params.source === 'SettingsScreen') {
        fetchBlockedContacts();
        route.params.source = '';
      } else if (!(route.params && route.params.source === 'SettingsScreen')) {
        fetchContacts();
      }
    });

    return unsubscribe;
  }, [navigation, route]);

  return (
    <SafeAreaView>
      <FlatList
        data={contacts}
        keyExtractor={(contact) => contact.user_id.toString()}
        renderItem={({ item }) => (
          <ContactComponent item={item} onPress={() => handleContact(item)} />
        )}
      />
    </SafeAreaView>
  );
}

export default ContactsScreen;
