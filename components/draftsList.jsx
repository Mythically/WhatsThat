import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// eslint-disable-next-line no-unused-vars
const DraftsList = ({ draftMessages, setDraftMessage, setInputMessage }) => {
  const handleCopyToInput = (draft) => {
    setInputMessage(draft);
  };

  return (
    <View>
      {draftMessages.map((draft, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={index}>
          <Text>{draft}</Text>
          <TouchableOpacity onPress={() => handleCopyToInput(draft)}>
            <Text>Copy to Input</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default DraftsList;
