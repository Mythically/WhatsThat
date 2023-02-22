import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// functional login component, it needs to have 2 inputs, one for email and one for password
// it needs to have a button that says login

const RegisterScreen = () => {
  return (
    <SafeAreaView>
      <TextInput
        placeholder="email@example.com"
        autoComplete="email"
      />
      <TextInput
        placeholder="password"
        autoComplete="password-new"
        secureTextEntry
      />
    </SafeAreaView>
  );
};

export default RegisterScreen;
