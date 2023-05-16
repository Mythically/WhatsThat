import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import HomeScreen from './screens/homeScreen';
import SettingsButton from './components/settingsButtonComponent';
import SettingsScreen from './screens/settingsScreen';
import ContactProfile from './screens/profileScreen';
import ConversationScreen from './screens/conversationScreen';
import ChatManager from './utils/manageChat';
import SearchUsersScreen from './screens/searchUsersScreen';
import RemoveContactScreen from './screens/removeContactScreen';
import CameraScreen from './screens/cameraScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="ProfileScreen" component={ContactProfile} />
        <Stack.Screen name="ChatManager" component={ChatManager} />
        <Stack.Screen name="Chat" component={ConversationScreen} />
        <Stack.Screen name="SearchUsers" component={SearchUsersScreen} />
        <Stack.Screen name="ContactRemove" component={RemoveContactScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen
          name="WhatsThat?!"
          component={HomeScreen}
          options={({ navigation }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => (
              <SettingsButton onPress={() => navigation.navigate('SettingsScreen')} />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
