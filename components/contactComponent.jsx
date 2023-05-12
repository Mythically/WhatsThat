import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function ContactComponent({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{
        borderColor: 'gray',
        borderWidth: 1,
      }}
      >
        <Text>
          {item.given_name} {item.family_name}
        </Text>
        <Text>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ContactComponent;
