import React from 'react';
import { View, Text, Modal, Button, TextInput } from 'react-native';

const ChatOptionsModal = ({
  modalVisible,
  setModalVisible,
  selectedChat,
  renameChat,
  newChatName,
  setNewChatName,
  addChatContact,
  navigation,
}) => {
  console.log('ChatOptionsModal called with selectedChat:', selectedChat);
  const handleRenameChat = async () => {
    try {
      await renameChat(selectedChat, newChatName);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddContact = (contact) => {
    addChatContact(contact);
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1, marginTop: 22, backgroundColor: '#fff', paddingHorizontal: 20 }}>
          <Text>Rename chat, Add contact and Remove contact</Text>

          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            value={newChatName}
            onChangeText={setNewChatName}
            placeholder="Enter new chat name"
          />

          <Button
            title="Rename chat"
            onPress={handleRenameChat}
          />

          <Button
            title="Add contact"
            onPress={() => {
              navigation.navigate('SearchUsers', { onContactSelect: handleAddContact });
              setModalVisible(false);
            }}
          />

          <Button
            title="Remove contact"
            onPress={() => {
              navigation.navigate('ContactRemove', { chatId: selectedChat });
              setModalVisible(false);
            }}
          />

          <Button
            title="Close"
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ChatOptionsModal;
