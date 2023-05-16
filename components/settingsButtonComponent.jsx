import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function SettingsButton({ onPress }) {
  return (
    // add margin right 5 to the button
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons name="cog" size={24} color="black" />
    </TouchableOpacity>
  );
}

export default SettingsButton;
