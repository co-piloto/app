import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

// import { Container } from './styles';

const LoadingModal = () => {
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0, left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 200,
          height: 200,
          backgroundColor: '#eeeeee',
          borderRadius: 6,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.5,
          shadowRadius: 7.49,
          elevation: 22,
        }}
      >
        <Text style={{ marginBottom: 30, color: '#1d305b', fontSize: 20, }}>Carregando</Text>
        <ActivityIndicator style={{ scaleY: 2, scaleX: 2 }} color="#1d305b" />
      </View>
    </View>
  );
}

export default LoadingModal;