import React, { useEffect, useState } from 'react';
import { FlatList, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ContactComponent from '../components/contactComponent';
import { getContacts, searchAllUsers } from '../services/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

function SearchUsersScreen({ route }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const { onContactSelect, source } = route.params;
  const fetchUsers = async () => {
    try {
      let fetchedUsers = [];
      console.log(source);
      console.log(route);
      if (source === 'SettingsScreen') {
        fetchedUsers = await searchAllUsers();
      } else {
        fetchedUsers = await getContacts();
      }

      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => `${user.given_name} ${user.family_name}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        onChangeText={(text) => setSearch(text)}
        value={search}
        placeholder="Search Users"
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(user) => user.user_id.toString()} // Convert user_id to string
        renderItem={({ item }) => (
          <ContactComponent
            item={item}
            onPress={() => {
              if (onContactSelect) {
                onContactSelect(item);
              } else {
                navigation.navigate('ProfileScreen', { contact: item });
              }
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}

export default SearchUsersScreen;
