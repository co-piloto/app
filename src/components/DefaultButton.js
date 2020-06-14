import React from 'react';
import { Button,Text } from 'native-base';

const DefaultButton = ({ onPress, title, type, disabled, style }) => {
  return (
    <Button
      disabled={disabled}
      style={{
        borderRadius: 50,
        backgroundColor: type === 'secondary' ? '#ffffff' : '#1d305b',
        borderWidth: 1,
        height: 54,
        zIndex: 10,
        ...style
      }}
      onPress={() => onPress && onPress()}
    >
      <Text
        style={{
          textAlign: 'center',
          width: '100%',
          color: type === 'secondary' ? '#1d305b' : '#ffffff' }}
      >
        {title}
      </Text>
    </Button>
  );
}

export default DefaultButton;