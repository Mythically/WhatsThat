import { getUserKey } from '../utils/userKeyStorage';
// create the calls for the 32 api endpoints
const baseUrl = 'http://localhost:3333/api/1.0.0/';

// register
// eslint-disable-next-line import/prefer-default-export,camelcase
export async function register(first_name, last_name, email, password) {
  return fetch(`${baseUrl}user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      password,
    }),
  });
}

// login
export async function login(email, password) {
  return fetch(`${baseUrl}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}
// update user
export async function updateUser(userId, firstName, lastName, email, password) {
  return fetch(`${baseUrl}user/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': await getUserKey(),
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });
}

// logout user
export async function logout() {
  return fetch(`${baseUrl}logout`, {
    method: 'POST',
    headers: {
      'X-Authorization': await getUserKey(),
    },
  });
}

// get users profile photo
export async function getProfilePhoto(userId) {
  return fetch(`${baseUrl}user/${userId}/photo`, {
    method: 'GET',
    headers: {
      'X-Authorization': await getUserKey(),
    },
  });
}

// update users profile photo
//get a list of chats
export async function getChatsList() {
  const userKey = await getUserKey();
  console.log('User Key:', userKey);

  return fetch(`${baseUrl}chat`, {
    method: 'GET',
    headers: {
      'X-Authorization': userKey,
    },
  });
}

// get all contacts
export async function getContacts() {
  const userKey = await getUserKey();
  return fetch(`${baseUrl}contacts`, {
    method: 'GET',
    headers: {
      'X-Authorization': userKey,
    },
  });
}

// search users
export async function searchAllUsers() {
  const userKey = await getUserKey();
  return fetch(`${baseUrl}search?search_in=all`, {
    method: 'GET',
    headers: {
      'X-Authorization': userKey,
    },
  });
}
