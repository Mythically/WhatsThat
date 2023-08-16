import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from './api';

export const storeUserId = async (id) => {
  try {
    await AsyncStorage.setItem('userId', id);
  } catch (error) {
    console.log(error);
  }
};

export const getUserId = async () => {
  try {
    return await AsyncStorage.getItem('userId');
  } catch (error) {
    console.log(error);
  }
};

export const storeFirstName = async () => {
  try {
    const userId = await getUserId();
    const response = await getUser(userId);
    const firstName = response.first_name;
    await AsyncStorage.setItem('firstName', firstName);
  } catch (error) {
    console.log(error);
  }
};

export const getFirstName = async () => {
  try {
    return await AsyncStorage.getItem('firstName');
  } catch (error) {
    console.log(error);
  }
};

export const localLogout = async () => {
  try {
    await AsyncStorage.removeItem('userKey');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('firstName');
  } catch (error) {
    console.log(error);
  }
};
