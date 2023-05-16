import React, { useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { View, Text, TouchableOpacity } from 'react-native';
import { sendPhoto } from '../services/api';

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  async function handleTakePciture() {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const photo = await camera.takePictureAsync(options);
      const response = await sendPhoto(photo);
      console.log(response);
    }
  }

  if (!permission || !permission.granted) {
    return (
      <View>
        <Text>No permission</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Camera style={{ width: '100%', height: '100%' }} type={type} ref={(ref) => setCamera(ref)} />
        <TouchableOpacity onPress={() => handleTakePciture} style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
          <Text style={{ fontSize: 20, color: 'white' }}>Take Photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
