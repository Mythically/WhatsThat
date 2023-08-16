// RemoveContactScreen.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button, FlatList } from 'react-native';

import { getChatDetails, removeUserFromChat } from '../services/api';

function RemoveContactScreen({ route }) {
  const { chatId } = route.params;
  const [chatDetails, setChatDetails] = useState(null);

  const fetchChatDetails = async () => {
    try {
      const response = await getChatDetails(chatId);
      setChatDetails(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleContactRemove = async (contactId) => {
    try {
      await removeUserFromChat(chatId, contactId);
      fetchChatDetails(); // Refresh the chat details after removing the contact
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChatDetails();
  }, []);

  return (
    <SafeAreaView>
      {chatDetails && (
        <FlatList
          data={chatDetails.members}
          keyExtractor={(item) => item.user_id.toString()}
          renderItem={({ item }) => (
            <Button
              title={`Remove ${item.first_name} ${item.last_name}`}
              onPress={() => handleContactRemove(item.user_id)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

export default RemoveContactScreen;
