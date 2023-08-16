import React, { useEffect } from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '../services/api';
import { validateEmail, validatePassword } from '../utils/validators';
import { storeUserKey, getUserKey } from '../utils/userKeyStorage';
import { storeFirstName, storeUserId } from '../services/loginManager';
import { styles } from '../styles/basicInputButton';

function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const checkUserKey = async () => {
    const userKey = await getUserKey();
    if (userKey != null) {
      navigation.navigate('WhatsThat?!');
    }
  };

  useEffect(() => {
    checkUserKey();
  }, []);

  const handleLogin = async () => {
    try {
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

      const response = await login(email, password);
      if (response.token && response.id) {
        console.log('Login successful');
        await storeUserKey(response.token);
        await storeUserId(response.id);
        await storeFirstName();
        while (getUserKey() === null) {
          console.log('Waiting for user key');
        }
        navigation.navigate('WhatsThat?!');
        console.log(response);
      } else {
        setLoginError(response);
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        accessibilityLabel="email-input"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        accessibilityLabel="password-input"
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
        accessibilityLabel="login-button"
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {loginError ? (
        <Text style={styles.errorText}>{loginError}</Text>
      ) : null}
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default LoginScreen;
