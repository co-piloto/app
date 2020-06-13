import React, { useState } from 'react';
import { Image } from 'react-native';
import { View, Container, Content, Form, Item, Input, Button, Text, Toast, Label } from 'native-base';
import { TextInputMask } from 'react-native-masked-text'
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
      Toast.show({
        text: 'Eae',
        duration: 2000,
      })
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
              <Item stackedLabel style={{ borderBottomWidth: 0, marginLeft: 0 }}>
                <Label style={{ marginBottom: 10 }}>Número de Celular</Label>
                <TextInputMask
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  }}
                  placeholder="(00) 00000-0000"
                  style={{
                    fontSize: 16,
                    width: '100%',
                    paddingLeft: 16,
                    borderWidth: .6,
                    borderRadius: 50,
                    borderColor: '#acacac',
                    paddingVertical: 10
                  }}
                  value={number}
                  onChangeText={text => setNumber(text)}
                />
              </Item>
              <Item stackedLabel style={{ marginBottom: 10, height: 84, borderBottomWidth: 0, marginLeft: 0 }}>
                <Label style={{ marginBottom: 10 }}>Senha</Label>
                <Input
                  style={{
                    fontSize: 16,
                    width: '100%',
                    paddingLeft: 16,
                    paddingBottom: 6,
                    borderWidth: .6,
                    borderColor: '#acacac',
                    borderRadius: 50,
                    paddingVertical: 10,
                  }}
                  value={password}
                  onChangeText={text => setPassword(text)}
                  placeholder="••••••••"
                  secureTextEntry
                />
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