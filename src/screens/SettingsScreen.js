import React, { useState, useEffect } from 'react';
import { Image, ScrollView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { View, Text, Container, Content, Form, Item, Input, Icon, Toast } from 'native-base';
import { LoadingModal, DefaultButton } from '../components';
import { Perfil } from '../assets';
import { Row, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-community/async-storage';
import { cleanNumber } from '../utils';
import axios from '../services/axios';

const SettingsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [formError, setFormError] = useState('');
  const update = async () => {
    setLoading(true);
    try {
      await axios.put('/user', { name, number: cleanNumber(number) });
      setLoading(false);
      navigation.navigate('Root');
    } catch (error) {
      setLoading(false);
      Toast.show({
        text: 'Não foi possível salvar suas alterações',
        duration: 2000,
      })          
    }
  };
  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Root');
  };
  useEffect(() => {
    AsyncStorage.multiGet(['user', 'session'], (error, results) => {
      const { name, number } = JSON.parse(results[0][1]);
      const token = results[1][1];
      axios.defaults.headers = {
        'Authorization': `Bearer ${token}`,
      };
      setName(name);
      setNumber(number);
      setLoading(false);
    });
  }, []);

  return (
    <ScrollView>
      <Container>
        <Content contentContainerStyle={{ flex: 1, backgroundColor: '#ffffff' }}>
          {loading && (
            <LoadingModal />
          )}
          <Grid>
            <Row style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
              <View
                style={{
                  width: 230,
                  height: 230,
                  borderRadius: 200,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 3,
                  borderColor: '#1d305b',
                }}
              >
                <Image
                  source={Perfil}
                  style={{ resizeMode: 'contain', width: '90%', height: '90%', tintColor: '#1d305b', borderRadius: 200 }}
                />
                {/* <View
                  style={{
                    backgroundColor: '#1d305b',
                    padding: 8,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    margin: 11,
                  }}
                >
                  <Icon name="square-edit-outline" type="MaterialCommunityIcons" style={{ color: '#ffffff', fontSize: 24 }} />
                </View> */}
              </View>
            </Row>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', paddingVertical: 20 }}>
              <Form style={{ width: '80%', marginTop: 20 }}>
                <Item error={['number'].includes(formError)} rounded style={{ borderColor: '#1d305b', marginLeft: 0, marginBottom: 10 }}>
                  <Input
                    style={{
                      fontSize: 16,
                      paddingLeft: 16,
                      color: '#1d305b',
                    }}
                    value={name}
                    onChangeText={e => setName(e)}
                    placeholder="Nome"
                  />
                  {['name'].includes(formError) && (
                    <Icon name='close-circle' style={{ marginRight: 10 }} />
                  )}
                </Item>
                <Item error={['number'].includes(formError)} rounded style={{ borderColor: '#1d305b', marginLeft: 0, marginBottom: 10, justifyContent: 'space-between' }}>
                  <TextInputMask
                    type={'cel-phone'}
                    options={{
                      maskType: 'BRL',
                      withDDD: true,
                      dddMask: '(99) ',
                    }}
                    placeholder="Número do celular"
                    placeholderTextColor="#1d305baa"
                    style={{
                      color: '#1d305b',
                      fontSize: 16,
                      paddingLeft: 16,
                    }}
                    value={number}
                    onChangeText={text => {
                      setNumber(text); 
                      if (formError !== '') setFormError('');
                    }}
                  />
                  {['number'].includes(formError) && (
                    <Icon name='close-circle' style={{ marginRight: 10 }} />
                  )}
                </Item>
                <DefaultButton
                  onPress={() => {
                    if (name.length < 4) return setFormError('name');
                    if (cleanNumber(number).length !== 11) return setFormError('number');
                    update()
                  }}
                  title="Salvar"
                />
              </Form>
              <View style={{ width: '80%' }}>
                <DefaultButton title="Sair" type="secondary" onPress={() => logout()} />
              </View>
            </Row>
          </Grid>
        </Content>
      </Container>
    </ScrollView>
  );
}

export default SettingsScreen;