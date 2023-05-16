import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const DraftsList = ({ draftMessages, setDraftMessage, setInputMessage }) => {
  const handleCopyToInput = (draft) => {
    setInputMessage(draft);
  };

  return (
    <View>
      {draftMessages.map((draft, index) => (
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
