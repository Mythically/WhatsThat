import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity, SafeAreaView,
} from 'react-native';
import {
  deleteMessage, editMessage, getMessages, sendMessage,
} from '../services/api';
import { getUserId } from '../services/loginManager';
import DraftsList from '../components/draftsList';

function ConversationScreen({ route }) {
  const { chatId } = route.params;
  console.log('chatId:', chatId);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [editingMessage, setEditingMessage] = useState(null);
  const [draftMessages, setDraftMessages] = useState([]);
  const [showDrafts, setShowDrafts] = useState(false);

  const fetchMessages = async () => {
    const userId = await getUserId();
    try {
      const data = await getMessages(chatId);
      console.log(data);
      const formattedMessages = data.messages.map((message) => {
        return {
          id: message.message_id,
          text: message.message,
          author: Number(message.author.user_id) === Number(userId) ? 'me' : 'them',
        };
      });
      setMessages([...formattedMessages].reverse());
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleSendMessage = async () => {
    if(editingMessage) {
      try {
        await editMessage(chatId, editingMessage.id, inputMessage);
        setInputMessage('');
        setEditingMessage(null);
        await fetchMessages();
      } catch (error) {
        console.error('Error editing message:', error);
      }
    } else {
      try {
        await sendMessage(chatId, inputMessage);
        setInputMessage('');
        await fetchMessages();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  async function handleDeleteMessage(messageId) {
    try {
      await deleteMessage(chatId, messageId);
      // After the message is deleted, fetch the messages again to update the list
      await fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  }

  const handleEditMessage = async () => {
    try {
      await editMessage(editingMessage.id, inputMessage);
      setInputMessage('');
      setEditingMessage(null);
      fetchMessages();
    } catch (error) {
      console.error('Error editing message:', error);
    }
  };

  const handleSaveDraft = () => {
    if (inputMessage !== '') {
      setDraftMessages([...draftMessages, inputMessage]);
      setInputMessage('');
    }
  };


  const handleLongPress = (message) => {
    setInputMessage(message.text);
    setEditingMessage(message);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => handleLongPress(item)}>
            <View style={{ alignSelf: item.author === 'me' ? 'flex-end' : 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
              {item.author === 'me' && (
                <TouchableOpacity onPress={() => handleDeleteMessage(item.id)}>
                  <Text style={{ color: 'red' }}>Delete</Text>
                </TouchableOpacity>
              )}
              <Text style={{ backgroundColor: item.author === 'me' ? 'blue' : 'grey', color: 'white', padding: 10, borderRadius: 10, margin: 5 }}>
                {item.text}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 }}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type your message"
        />
        <TouchableOpacity onPress={handleSaveDraft}>
          <Text>Save Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDrafts(!showDrafts)}>
          <Text>Show Drafts</Text>
        </TouchableOpacity>
        {showDrafts && (
          <DraftsList
            draftMessages={draftMessages}
            setDraftMessage={setDraftMessages}
            setInputMessage={setInputMessage}
          />
        )}
        <TouchableOpacity onPress={handleSendMessage}>
          <Text>{editingMessage ? 'Save' : 'Send'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default ConversationScreen;
