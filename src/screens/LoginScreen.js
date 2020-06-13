import React from 'react';
import { Image } from 'react-native';
import { View, Text } from 'native-base';

const LoginScreen = () => {
  return (
    <View
      style={{ flex: 1, alignItems: 'center' }}
    >
      <Image
        style={{ width: 300, height: 200, resizeMode: 'contain' }}
        source={{ uri: 'https://i.makeagif.com/media/9-14-2015/ojOCpy.gif' }}
      />
      <Text>Login</Text>
    </View>
  );
}

export default LoginScreen;