import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { register, updateUser } from '../services/api';
import { validateEmail, validatePassword } from '../utils/validators';
import { getUserId } from '../services/loginManager';
import { styles } from '../styles/basicInputButton';

function RegisterScreen({ navigation }) {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [updateError, setUpdateError] = useState('');
  const route = useRoute();
  const { source, data } = route.params || {};
  const [email, setEmail] = useState(data && data.email ? data.email : '');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(data && data.first_name ? data.first_name : '');
  const [lastName, setLastName] = useState(data && data.last_name ? data.last_name : '');

  useEffect(() => {
    if (source === 'SettingsScreen') {
      navigation.setOptions({ title: 'Update Profile' });
    }
  }, []);

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid email');
      return;
    }
    setEmailError('');

    if (!validatePassword(password)) {
      setPasswordError('Invalid password');
      return;
    }
    setPasswordError('');

    const responseRegister = await register(firstName, lastName, email, password);
    if ('user_id' in responseRegister) {
      navigation.navigate('LoginScreen');
    } else {
      console.error('Registration failed.', responseRegister);
      setRegisterError(`Registration failed, ${responseRegister}`);
    }
  };

  const handleUpdate = async () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid email');
      return;
    }
    setEmailError('');

    if (!validatePassword(password)) {
      setPasswordError('Invalid password');
      return;
    }
    setPasswordError('');

    const userId = await getUserId();
    const first_name = firstName;
    const last_name = lastName;
    const responseUpdate = await updateUser(userId, first_name, last_name, email, password);
    if (responseUpdate.ok) {
      navigation.navigate('WhatsThat?!');
    } else {
      setUpdateError('Update failed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Firstname"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
        accessibilityLabel="firstname-input"
      />
      <TextInput
        placeholder="Lastname"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
        accessibilityLabel="lastname-input"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        placeholder="email@example.com"
        autoCompleteType="email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        accessibilityLabel="email-input"
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <TextInput
        placeholder="password"
        autoCompleteType="password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        accessibilityLabel="password-input"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={source === 'SettingsScreen' ? handleUpdate : handleRegister}
        accessibilityLabel="register-button"
      >
        <Text style={styles.buttonText}>{source === 'SettingsScreen' ? 'Update' : 'Register'}</Text>
      </TouchableOpacity>
      <Text style={styles.errorText}>{registerError}</Text>
      <Text style={styles.errorText}>{updateError}</Text>
    </SafeAreaView>
  );
}

export default RegisterScreen;
