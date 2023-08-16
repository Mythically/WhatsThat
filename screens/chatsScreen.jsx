import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  addUserToChat,
  getChatsList,
  updateChatName,
} from '../services/api';
import ChatOptionsModal from '../components/chatOptionsModal';
import styles from '../styles/styles';

function ChatsScreen({ navigation }) {
  const [chats, setChats] = useState([]);
  // const [isLoading, setIsLoading] = useState(true); // for some reason it just no work 🤷‍♀️
  const [selectedChat, setSelectedChat] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const fetchChats = async () => {
    try {
      const chatsData = await getChatsList();
      setChats(chatsData);
    } catch (error) {
      console.error(error);
      // } finally {
      //   setIsLoading(false);
      // }
    }
  };

  const handleChatPress = (chatId) => {
    navigation.navigate('Chat', { chatId });
  };

  // if (isLoading) {
  //   return (
  //     <SafeAreaView>
  //       <Text>Loading...</Text>
  //     </SafeAreaView>
  //   );
  // }

  const renameChat = useCallback(async (chatId) => {
    try {
      await updateChatName(chatId, newChatName);
      await fetchChats();
      setNewChatName('');
    } catch (error) {
      console.error(error);
    }
  }, [newChatName]);

  const addChatContact = useCallback(async (contact) => {
    try {
      await addUserToChat(selectedChat, contact.user_id);
      await fetchChats();
    } catch (error) {
      console.error(error);
    }
  }, [selectedChat]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchChats();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(chat) => chat.chat_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => handleChatPress(item.chat_id)}
            onLongPress={() => {
              setSelectedChat(item.chat_id);
              setModalVisible(true);
            }}
          >
            <View>
              <Text style={styles.chatName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <ChatOptionsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedChat={selectedChat}
        renameChat={renameChat}
        newChatName={newChatName}
        setNewChatName={setNewChatName}
        addChatContact={addChatContact}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

export default ChatsScreen;
