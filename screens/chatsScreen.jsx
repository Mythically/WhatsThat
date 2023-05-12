import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getChatsList } from '../services/api';

function ChatsScreen() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const chatsData = await getChatsList().json();
        setChats(chatsData);
      } catch (error) {
        console.error(error);
      }
    };
    getChats();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={chats}
        keyExtractor={(chat) => chat.id.toString()}
        renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
            </View>
        )}
      />
    </SafeAreaView>
  );
}

export default ChatsScreen;
