import React, { useEffect, useCallback } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { getUser, logout } from '../services/api';
import { getUserId, localLogout } from '../services/loginManager';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
function SettingsScreen() {
  const navigation = useNavigation();
  const handleContactSelect = useCallback((contact) => {
    navigation.navigate('ProfileScreen', { contact });
  }, []);

  const handleAddContact = () => {
    navigation.navigate('SearchUsers', { source: 'SettingsScreen' });
  };
  useEffect(() => {
    navigation.setOptions({
      onContactSelect: handleContactSelect,
    });
  }, [navigation, handleContactSelect]);

  const handleViewBlockedContacts = () => {
    navigation.navigate('WhatsThat?!', { screen: 'Contacts', params: { source: 'SettingsScreen' } });
  };

  const handleProfileUpdate = async () => {
    try {
      const userId = await getUserId();
      const userData = await getUser(userId);
      navigation.navigate('RegisterScreen', {
        source: 'SettingsScreen',
        data: userData,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = async () => {
    try {
      const logoutOk = await logout();
      if (logoutOk.ok) {
        await localLogout();
      }
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.navigate('CameraScreen')}>
        <Text style={styles.buttonText}>Pupload Profile Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleProfileUpdate()}style={styles.button}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAddContact} style={styles.button}>
        <Text style={styles.buttonText}>Add a contact</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleViewBlockedContacts}style={styles.button}>
        <Text style={styles.buttonText}>View blocked contacts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default SettingsScreen;
