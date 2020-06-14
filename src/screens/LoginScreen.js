import React, { useState } from 'react';
import { Image } from 'react-native';
import { View, Container, Content, Form, Item, Input, Icon, Toast } from 'native-base';
import { TextInputMask } from 'react-native-masked-text'
import { Row, Grid } from 'react-native-easy-grid';
import axios from '../services/axios';
import { cleanNumber } from '../utils';
import AsyncStorage from '@react-native-community/async-storage';
import { DefaultButton, LoadingModal } from '../components';

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const login = async () => {
    setLoading(true);
    try {
      const { data: { token } } = await axios.post('/login', {
        number: cleanNumber(number),
        password,
      });
      setLoading(false);
      await AsyncStorage.setItem('session', token);
      navigation.navigate('Root');
    } catch ({ message }) {
      setLoading(false);
      const status = cleanNumber(message);
      if (status === 400) setFormError('all')
      if (status === 401) setFormError('password')
      Toast.show({
        text: status === '401' ? 'Credenciais inválidas' : 'Conta Inexistente',
        duration: 2000,
      })
    }
  }

  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
        {loading && (
          <LoadingModal />
        )}
        <Grid>
          <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              style={{ width: 300, height: 200, resizeMode: 'contain' }}
              source={{ uri: 'https://i.makeagif.com/media/9-14-2015/ojOCpy.gif' }}
            />
          </Row>
          <Row style={{ alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, flexDirection: 'column' }}>
            <View />
            <Form style={{ width: '80%' }}>
              <Item rounded style={{ marginLeft: 0, marginBottom: 10, justifyContent: 'space-between' }} error={['email', 'all'].includes(formError)}>
                <TextInputMask
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  }}
                  placeholder="Número do celular"
                  placeholderTextColor="#4f4f4f"
                  style={{
                    fontSize: 16,
                    paddingLeft: 16,
                  }}
                  value={number}
                  onChangeText={text => {
                    setNumber(text); 
                    if (formError !== '') setFormError('');
                  }}
                />
                {['all'].includes(formError) && (
                  <Icon name='close-circle' style={{ marginRight: 10 }} />
                )}
              </Item>
              <Item rounded style={{ marginLeft: 0, marginBottom: 10 }} error={['password', 'all'].includes(formError)}>
                <Input
                  style={{
                    fontSize: 16,
                    paddingLeft: 16,
                  }}
                  value={password}
                  onChangeText={text => {
                    setPassword(text); 
                    if (formError !== '') setFormError('');
                  }}
                  placeholder="Senha"
                  placeholderTextColor="#4f4f4f"
                  secureTextEntry
                />
                {['password', 'all'].includes(formError) && (
                  <Icon name='close-circle' style={{ marginRight: 10 }} />
                )}
              </Item>
              <DefaultButton
                title="ENTRAR"
                onPress={() => {
                  if(cleanNumber(number).length !== 11 || password.length < 4) return setFormError('all');
                  else return login()
                }}
                style={{ marginBottom: 10 }}
              />
              {/* <TouchableOpacity style={{ marginTop: 6 }}>
                <Text style={{ alignSelf: 'center', color: '#1d305b', fontWeight: '100', fontSize: 16 }}>Esqueci minha senha</Text>
              </TouchableOpacity> */}
            </Form>
            <View style={{ width: '80%' }}>
              <DefaultButton type="secondary" title="REGISTRE-SE" onPress={() => navigation.navigate('Register')} />
            </View>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
}

export default LoginScreen;