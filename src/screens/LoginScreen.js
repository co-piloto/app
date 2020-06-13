import React, { useState } from 'react';
import { Image } from 'react-native';
import { View, Container, Content, Form, Item, Input, Button, Text } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import axios from '../services/axios';

const LoginScreen = () => {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      // const data = await axios.post('/login', {
      //   number,
      //   password,
      // });
      const { data } = await axios.get('/');
      console.log(data);
    } catch (error) {
      console.log(error);      
    }
  }

  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
        <Grid>
          <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              style={{ width: 300, height: 200, resizeMode: 'contain' }}
              source={{ uri: 'https://i.makeagif.com/media/9-14-2015/ojOCpy.gif' }}
            />
          </Row>
          <Row style={{ alignItems: 'center', justifyContent: 'space-between', paddingVertical: 30, flexDirection: 'column' }}>
            <Form style={{ width: '80%' }}>
              <Item rounded style={{ marginBottom: 10, paddingLeft: 10 }}>
                <Input value={number} onChangeText={(e) => setNumber(e)} placeholder='Número' />
              </Item>
              <Item rounded style={{ marginBottom: 10, paddingLeft: 10 }}>
                <Input value={password} onChangeText={(e) => setPassword(e)} placeholder='Senha' secureTextEntry />
              </Item>
            </Form>
            <View style={{ width: '80%' }}>
              <Button danger style={{ borderRadius: 50 }} onPress={() => login()}>
                <Text style={{ width: '100%', textAlign: 'center' }}>Entrar</Text>
              </Button>
            </View>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
}

export default LoginScreen;