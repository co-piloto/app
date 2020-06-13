import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

const RootScreen = ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.getItem('session').then(session => {
      if (session) navigation.navigate('App')
      else navigation.navigate('Initial')
    });
  }, []);
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text
        style={{ marginBottom: 20, fontSize: 26, color: '#ff0000', fontWeight: 'bold' }}
      >
        TRAUCKER
      </Text>
      <ActivityIndicator size="large" color="#ff0000" />
    </View>
  );
}

export default RootScreen;