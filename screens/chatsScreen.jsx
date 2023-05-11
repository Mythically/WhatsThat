// create a functional component to display the screen containing
// all the chats and messages the user has
// chats need to be get from the api at localhost:3333/chat
// display chats in a flatlist
import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const ChatsScreen = () => {
  const [chats, setChats] = useState([]);

  return (
    <View>
      <FlatList
        data={chats}
        keyExtractor={(chat) => chat.id}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ChatsScreen;
