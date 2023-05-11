// create the calls for the 32 api endpoints
const baseUrl = 'http://localhost:3333/api/1.0.0/';
// register
// eslint-disable-next-line import/prefer-default-export,camelcase
export function register(first_name, last_name, email, password) {
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
export function login(email, password) {
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
function updateUser(userId, firstName, lastName, email, password) {
  return fetch(`${baseUrl}user/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': localStorage.getItem('token'),
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
function logout() {
  return fetch(`${baseUrl}logout`, {
    method: 'POST',
    headers: {
      'X-Authorization': localStorage.getItem('token'),
    },
  });
}

// get users profile photo
function getProfilePhoto(userId) {
  return fetch(`${baseUrl}user/${userId}/photo`, {
    method: 'GET',
    headers: {
      'X-Authorization': localStorage.getItem('token'),
    },
  });
}

// update users profile photo

