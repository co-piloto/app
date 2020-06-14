import React, { useState, useEffect } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { View, Container, Content, Form, Item, Input, Icon, Toast, Text } from 'native-base';
import { TextInputMask } from 'react-native-masked-text'
import { Row, Grid } from 'react-native-easy-grid';
import axios from '../services/axios';
import { cleanNumber } from '../utils';
import AsyncStorage from '@react-native-community/async-storage';
import { DefaultButton, LoadingModal } from '../components';

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [formError, setFormError] = useState('');
  
  const register = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('/user', {
        name,
        number: cleanNumber(number),
        password,
      });
      setLoading(false);
      await AsyncStorage.setItem('session', data.token);
      navigation.navigate('Root');
    } catch (error) {
      setLoading(false);
      Toast.show({
        text: 'Erro ao realizar cadastro',
        duration: 2000,
      })
    }
  }

  useEffect(() => {
    if(formError !== '') setFormError('');
  }, [name, number, password, confirmPass])

  return (
    <ScrollView contentContainerStyle={{ height: Dimensions.get('screen').height - 30 }}>
      <Container>
        <Content contentContainerStyle={{ flex: 1 }}>
          {loading && (
            <LoadingModal />
          )}
          <Grid>
            <Row style={{ alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, flexDirection: 'column' }}>
              <View />
              <Form style={{ width: '80%' }}>
                <View style={{ width: '100%', marginBottom: 40 }}>
                  <Text style={{ alignSelf: 'flex-end', marginBottom: 10, fontSize: 24, color: '#1d305b' }}>VAMOS COMEÇAR!</Text>
                  <Text style={{ color: '#1d305b' }}>Precisamos de algumas informações para cadastra-lo em nossa plataforma</Text>
                </View>
                <Item rounded style={{ marginLeft: 0, marginBottom: 10 }} error={formError === 'name'}>
                  <Input
                    style={{
                      fontSize: 16,
                      paddingLeft: 16,
                    }}
                    value={name}
                    onChangeText={text => setName(text)}
                    placeholder="Nome"
                    placeholderTextColor="#4f4f4f"
                  />
                  {['name'].includes(formError) && (
                    <Icon name='close-circle' style={{ marginRight: 10 }} />
                  )}
                </Item>
                <Item rounded style={{ marginLeft: 0, marginBottom: 10, justifyContent: 'space-between' }} error={formError === 'number'}>
                  <TextInputMask
                    type={'cel-phone'}
                    options={{
                      maskType: 'BRL',
                      withDDD: true,
                      dddMask: '(99) ',
                    }}
                    placeholder="Número de celular"
                    placeholderTextColor="#4f4f4f"
                    style={{
                      fontSize: 16,
                      paddingLeft: 16,
                    }}
                    value={number}
                    onChangeText={text => setNumber(text)}
                  />
                  {['number'].includes(formError) && (
                    <Icon name='close-circle' style={{ marginRight: 10 }} />
                  )}
                </Item>
                <Item rounded style={{ marginLeft: 0, marginBottom: 10 }} error={formError === 'password'}>
                  <Input
                    style={{
                      fontSize: 16,
                      paddingLeft: 16,
                    }}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder="Senha"
                    placeholderTextColor="#4f4f4f"
                    secureTextEntry
                  />
                  {['password'].includes(formError) && (
                    <Icon name='close-circle' style={{ marginRight: 10 }} />
                  )}
                </Item>
                <Item rounded style={{ marginLeft: 0, marginBottom: 10 }} error={formError === 'matchPass'}>
                  <Input
                    style={{
                      fontSize: 16,
                      paddingLeft: 16,
                    }}
                    value={confirmPass}
                    onChangeText={text => setConfirmPass(text)}
                    placeholder="Confirmar senha"
                    placeholderTextColor="#4f4f4f"
                    secureTextEntry
                  />
                  {['matchPass'].includes(formError) && (
                    <Icon name='close-circle' style={{ marginRight: 10 }} />
                  )}
                </Item>
              </Form>
              <View style={{ width: '80%' }}>
                <DefaultButton
                  title="CONCLUIR CADASTRO"
                  style={{ marginBottom: 10 }}
                  onPress={() => {
                    if (name.length < 4) return setFormError('name');
                    if (cleanNumber(number).length !== 11) return setFormError('number');
                    if (password.length < 4) return setFormError('password');
                    if (password !== confirmPass) return setFormError('matchPass');
                    return register();
                  }}
                />
                <DefaultButton
                  title="VOLTAR"
                  type="secondary"
                  onPress={() => navigation.navigate('Login')}
                />
              </View>
            </Row>
          </Grid>
        </Content>
      </Container>
    </ScrollView>
  );
}

export default RegisterScreen;