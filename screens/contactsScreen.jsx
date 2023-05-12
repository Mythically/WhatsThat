import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { searchAllUsers } from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';

function ContactsScreen() {
  const [contacts, setContacts] = useState([]);

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
          <View>
            <Text>
              {/* AIRBNB: HEY ONE ITEM PER LINE, also AIRBNB: HEY NO TRAILING SPACES 🙄 */}
              {item.given_name} {item.family_name}
            </Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default ContactsScreen;
