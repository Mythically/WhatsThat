import { getUserKey } from '../utils/userKeyStorage';
import timeout from '../utils/chatListTimeout';
import { getUserId } from './loginManager';

const baseUrl = 'http://localhost:3333/api/1.0.0/';

// eslint-disable-next-line camelcase
export async function register(first_name, last_name, email, password) {
  const response = await fetch(`${baseUrl}user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // eslint-disable-next-line camelcase
      first_name,
      // eslint-disable-next-line camelcase
      last_name,
      email,
      password,
    }),
  });

  return response.json();
}

export async function login(email, password) {
  const response = await fetch(`${baseUrl}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    return response.json();
  }
  return 'Invalid email/password supplied';
}

export async function getUser(userId) {
  const userKey = await getUserKey();
  const response = await fetch(`${baseUrl}user/${userId}`, {
    method: 'GET',
    headers: {
      'X-Authorization': userKey,
    },
  });
  return response.json();
}

export async function updateUser(userId, firstName, lastName, email, password) {
  const userKey = await getUserKey();
  return await fetch(`${baseUrl}user/${userId}`, {
    method: 'PATCH',
    headers: {
      'X-Authorization': userKey,
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });
}

export async function logout() {
  const userKey = await getUserKey();
  return await fetch(`${baseUrl}logout`, {
    method: 'POST',
    headers: {
      'X-Authorization': userKey,
    },
  });
}

export async function getProfilePhoto(userId) {
  const userKey = await getUserKey();
  const response = await fetch(`${baseUrl}user/${userId}/photo`, {
    method: 'GET',
    headers: {
      'X-Authorization': userKey,
    },
  });

  return response.json();
}

export async function getChatsList() {
  try {
    const userKey = await getUserKey();
    const responsePromise = fetch(`${baseUrl}chat`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'X-Authorization': userKey,
      },
    });

    const response = await timeout(5000, responsePromise); // Waiting max 1 second for response

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error in getChatsList:', error);
    // If there's an error or timeout, return null
    return null;
  }
}

export async function getChatDetails(chatId) {
  const userKey = await getUserKey();
  const response = await fetch(`${baseUrl}chat/${chatId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'X-Authorization': userKey,
    },
  });

  return response.json();
}

export async function createChat(name) {
  const userKey = await getUserKey();
  const response = await fetch(`${baseUrl}chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': userKey,
    },
    body: JSON.stringify({
      name,
    }),
  });

  const jsonResponse = await response.json();
  console.log('Response:', jsonResponse);
  return jsonResponse;
}

export async function addUserToChat(chatId, userId) {
  const userKey = await getUserKey();
  return fetch(`${baseUrl}chat/${chatId}/user/${userId}`, {
    method: 'POST',
    headers: {
      'X-Authorization': userKey,
    },
  });
}

export async function removeUserFromChat(chatId, userId) {
  const userKey = await getUserKey();
  return fetch(`${baseUrl}chat/${chatId}/user/${userId}`, {
    method: 'DELETE',
    headers: {
      'X-Authorization': userKey,
    },
  });
}

export async function updateChatName(chatId, name) {
  const userKey = await getUserKey();
  return fetch(`${baseUrl}chat/${chatId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': userKey,
    },

    body: JSON.stringify({
      name,
    }),
  });
}

export async function getMessages(chatId) {
  const userKey = await getUserKey();
  const response = await fetch(`${baseUrl}chat/${chatId}`, {
    method: 'GET',
    headers: {
      'X-Authorization': userKey,
    },
  });

  return response.json();
}

export async function sendMessage(chatId, message) {
  const userKey = await getUserKey();
  return await fetch(`${baseUrl}chat/${chatId}/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': userKey,
    },
    body: JSON.stringify({
      message,
    }),
  });
}

export async function deleteMessage(chatId, messageId) {
  const userKey = await getUserKey();
  return await fetch(`${baseUrl}chat/${chatId}/message/${messageId}`, {
    method: 'DELETE',
    headers: {
      'X-Authorization': userKey,
    },
  });
}

export async function editMessage(chatId, messageId, message) {
  const userKey = await getUserKey();
  return await fetch(`${baseUrl}chat/${chatId}/message/${messageId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': userKey,
    },
    body: JSON.stringify({
      message,
    }),
  });
}

export async function getContacts() {
  const userKey = await getUserKey();
  const response = await fetch(`${baseUrl}contacts`, {
    method: 'GET',
    headers: {
      'X-Authorization': userKey,
    },
  });

  return response.json();
}

export async function addContact(userId) {
  const userKey = await getUserKey();
  return await fetch(`${baseUrl}user/${userId}/contact`, {
    method: 'POST',
    headers: {
      'X-Authorization': userKey,
    },
  });
}

export async function removeContact(userId) {
  const userKey = await getUserKey();
  return await fetch(`${baseUrl}user/${userId}/contact`, {
    method: 'DELETE',
    headers: {
      'X-Authorization': userKey,
    },
  });
}

// block contact
export async function blockContact(userId) {
  const userKey = await getUserKey();
  return await fetch(`${baseUrl}user/${userId}/block`, {
    method: 'POST',
    headers: {
      'X-Authorization': userKey,
    },
  });
}

// unblock contact
export async function unblockContact(userId) {
  const userKey = await getUserKey();
  return await fetch(`${baseUrl}user/${userId}/block`, {
    method: 'DELETE',
    headers: {
      'X-Authorization': userKey,
    },
  });
}

// get blocked contacts
export async function getBlockedContacts() {
  const userKey = await getUserKey();
  const response = await fetch(`${baseUrl}blocked`, {
    method: 'GET',
    headers: {
      'X-Authorization': userKey,
    },
  });

  return response.json();
}

export async function searchAllUsers() {
  const userKey = await getUserKey();
  const response = await fetch(`${baseUrl}search?search_in=all`, {
    method: 'GET',
    headers: {
      'X-Authorization': userKey,
    },
  });

  return response.json();
}

// export async function sendPhoto(data){
//   const userId = await getUserId();
//   const userKey = await getUserKey();
//   let photo = fetch(data.base64);
//   let blob = await photo.blob();
//
//   return await fetch(`${baseUrl}chat/${userId}/photo`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'image/png',
//       'X-Authorization': userKey,
//     },
//     body: blob,
//   });
// }
//
// export async function getPhoto(userId){
//   const userKey = await getUserKey();
//   const response = await fetch(`${baseUrl}user/${userId}/photo`, {
//     method: 'GET',
//     headers: {
//       'X-Authorization': userKey,
//     },
//   });
//   return response;
// }
