import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { register, login, updateUser } from '../services/api';
import { validateEmail, validatePassword } from '../utils/validators';
import { getUserId } from '../services/loginManager';
import { useRoute } from '@react-navigation/native';
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
    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Invalid email');
      return;
    }
    setEmailError('');

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError('Invalid password');
      return;
    }
    setPasswordError('');

    try {
      if (source === 'SettingsScreen') {
        const userId = await getUserId();
        const responseUpdate = await updateUser(userId, firstName, lastName, email, password);
        if (responseUpdate.ok) {
          navigation.navigate('LoginScreen!');
        } else {
          setUpdateError('Update failed');
        }
      } else {
        const responseRegister = await register(firstName, lastName, email, password);
        if ('user_id' in responseRegister) {
          const responseLogin = await login(email, password);
          if ('token' in responseLogin) {
            navigation.navigate('WhatsThat?!');
          } else {
            console.error('Login failed. Please try again.');
          }
        } else {
          console.error('Registration failed.', responseRegister);
          setRegisterError(`Registration failed, ${responseRegister}`);
        }
      }
    } catch (error) {
      console.error(error);
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
        onPress={handleRegister}
        accessibilityLabel="register-button"
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.errorText}>{registerError}</Text>
      <Text style={styles.errorText}>{updateError}</Text>
    </SafeAreaView>
  );
}

export default RegisterScreen;
