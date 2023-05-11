import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { register, login } from '../services/api';
import { validateEmail, validatePassword } from '../utils/validators';
import ChatsScreen from './chatsScreen';

function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registerErroor, setRegisterError] = useState('');
  const handleRegister = () => {
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

    register(firstName, lastName, email, password)
      .then((responseRegister) => {
        if (responseRegister.status === 200) {
          console.log('Registration successful. Logging in...');
          login(email, password)
            .then((responseLogin) => {
              if (responseLogin.status === 200) {
                responseLogin.json().then((data) => {
                  console.log('Login successful', data);
                  navigation.navigate('HomeScreen');
                });
              } else {
                console.error('Login failed. Please try again.');
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          responseRegister.text().then((errorText) => {
            setRegisterError(`Registration failed, ${errorText}`);
            console.error('Registration failed.', errorText);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Firstname"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Lastname"
        value={lastName}
        onChangeText={setLastName}
      />
      {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
      <TextInput
        placeholder="email@example.com"
        autoCompleteType="email"
        value={email}
        onChangeText={setEmail}
      />
      {passwordError ? (
        <Text style={{ color: 'red' }}>{passwordError}</Text>
      ) : null}
      <TextInput
        placeholder="password"
        autoCompleteType="password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleRegister}>
        <Text>Register</Text>
      </TouchableOpacity>
      <Text style={{ color: 'mustard' }}>{registerErroor}</Text>
    </SafeAreaView>
  );
}

export default RegisterScreen;
