import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addContact, searchAllUsers } from '../services/api';
// to save my life i cannot tell you why sometimes we don't need the curly braces
// around the imported component 🤷‍♀️
import ContactComponent from '../components/contactComponent';

function ContactsScreen() {
  const [contacts, setContacts] = useState([]);

  const handleAddContact = async (userId) => {
    try {
      await addContact(userId);
      // Perform any additional actions after adding the contact
      console.log('Contact added successfully!');
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const data = await searchAllUsers();
      const jsonn = await data.json();
      setContacts(jsonn);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={contacts}
        keyExtractor={(contact) => contact.user_id.toString()}
        renderItem={({ item }) => (
          <ContactComponent item={item} onPress={() => handleAddContact(item.user_id)} />
        )}
      />
    </SafeAreaView>
  );
}

export default ContactsScreen;
