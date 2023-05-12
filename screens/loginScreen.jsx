import React from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '../services/api';
import { validateEmail, validatePassword } from '../utils/validators';
import { storeUserKey } from "../utils/userKeyStorage";

function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const handleLogin = () => {
    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Invalid email');
      return;
    } else {
      setEmailError('');
    }

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError('Invalid password');
      return;
    } else {
      setPasswordError('');
    }

    login(email, password).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          storeUserKey(data.token);
        });
        navigation.navigate('WhatsThat?!');
        console.log(response);
      } else {
        response.text().then((data) => {
          setLoginError(data);
        });
        console.log(response);
      }
    });
  };

  const handleRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? (<Text style={{ color: 'red' }}>{passwordError}</Text>) : null}
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      {loginError ? (<Text style={{ color: 'red' }}>{loginError}</Text>) : null}
      <TouchableOpacity onPress={handleRegister}>
        <Text>Don't have an account? Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default LoginScreen;
