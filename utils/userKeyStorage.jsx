import EncryptedStorage from 'react-native-encrypted-storage';

export async function storeUserKey(key) {
  try {
    await EncryptedStorage.setItem('userKey', key);
  } catch (error) {
    console.log(error);
  }
}
