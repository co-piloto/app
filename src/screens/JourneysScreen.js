import React from 'react';
import { Container, Content, View, Text, Button, Icon, List, ListItem, } from 'native-base';

const datas = [
  'Maracanã - Morumbi',
];

const JourneysScreen = () => {
  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
        <Text style={{ fontSize: 24, padding: 20, backgroundColor: '#1d305b', color: '#ffffff' }} >Minhas viagens</Text>
        <View style={{ width: '100%', borderBottomWidth: .8, paddingHorizontal: 26, padding: 16, justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, color: '#1d305b', fontWeight: 'bold' }}>Maracanã - Morumbi</Text>
          <Icon name="alert" style={{ color: '#1d305b' }} />
        </View>
      </Content>
    </Container>
  );
}

export default JourneysScreen;