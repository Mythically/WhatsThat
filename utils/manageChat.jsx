import { getChatsList, createChat, addUserToChat } from '../services/api';
import { getFirstName, getUserId } from '../services/loginManager';

async function ManageChat(navigation, contact) {
  console.log(contact);
  try {
    const currentUserId = await getUserId();
    console.log(currentUserId);
    const chats = await getChatsList();
    console.log(chats);

    // If chats is null, assume it's due to timeout and create a new chat
    if (!chats) {
      console.log('No response from getChatsList within 1 second, creating a new chat...');
      const newChat = await createChat(`${await getFirstName()} + ${contact.given_name}`);
      await addUserToChat(newChat.chat_id, contact.user_id);
      navigation.navigate('Chat', { chatId: newChat.chat_id });
      return;
    }
    const authorFirstName = await getFirstName();
    const chatNameToFind = `${authorFirstName} + ${contact.given_name}`;

    // eslint-disable-next-line no-restricted-syntax
    for (const chat of chats) {
      if (chat.name === chatNameToFind) {
        console.log(chat.name, '   ', chatNameToFind);
        console.log('Chat already exists with this user');
        navigation.navigate('Chat', { chatId: chat.chat_id });
        return;
      }
    }

    // If no existing chat is found, create a new chat
    console.log('No chat exists with this user, creating a new chat...');
    console.log(contact.given_name);
    const newChat = await createChat(`${await getFirstName()} + ${contact.given_name}`);
    await addUserToChat(newChat.chat_id, contact.user_id);
    navigation.navigate('Chat', { chatId: newChat.chat_id });
  } catch (error) {
    console.error('Error in ManageChat:', error);
  }
}

export default ManageChat;
