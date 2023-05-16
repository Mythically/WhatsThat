import { getBlockedContacts, getContacts } from '../services/api';

export const getContactStatus = async (contactId) => {
  try {
    const blockedContacts = await getBlockedContacts();
    const contacts = await getContacts();

    if (blockedContacts.find((blockedContact) => blockedContact.user_id === contactId)) {
      return 'blocked';
    } if (contacts.find((addedContact) => addedContact.user_id === contactId)) {
      return 'added';
    }
    return 'not_added';
  } catch (error) {
    console.error('Error fetching contact status:', error);
    return null;
  }
};
