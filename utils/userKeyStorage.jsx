import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserKey = async (key) => {
  try {
    await AsyncStorage.setItem('userKey', key);
  } catch (error) {
    console.log(error);
  }
};
export const getUserKey = async () => {
  try {
    return await AsyncStorage.getItem('userKey');
  } catch (error) {
    console.log(error);
  }
};
