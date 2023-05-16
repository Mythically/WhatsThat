import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

function ContactComponent({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.chatItem} onPress={onPress}>
      <View>
        <Text style={styles.chatName}>
          {item.given_name} {item.family_name}
        </Text>
        <Text>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ContactComponent;
