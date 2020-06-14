import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, PermissionsAndroid } from 'react-native';
import { View, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { Logo } from '../assets';
import { DefaultButton } from '../components';
import { Row, Grid } from 'react-native-easy-grid';
import axios from '../services/axios';

const RootScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const requestGPSPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Precisamos de acesso a sua localização",
          message:
            "Para automatizar algumas tarefas e conseguirmos tranquilizar-lo " +
            "precisamos de acesso a sua localização.",
          buttonNegative: "Negar",
          buttonPositive: "Permitir"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigation.navigate('Initial')
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    AsyncStorage.getItem('session').then(async (token) => {
      if (token) {
        try {
          const { data: { user } = {} } = await axios.get('/user', { headers: { Authorization: `Bearer ${token}` } });
          await AsyncStorage.setItem('user', JSON.stringify(user));
          navigation.navigate('App');
        } catch (error) {
          AsyncStorage.clear();          
        }
      }
      setLoading(false);
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: '100%', height: '100%', backgroundColor: '#1d305b', position: 'absolute', top: 0, left: 0 }}>
        <View style={{ backgroundColor: 'white', width: '40%', height: 8, position: 'absolute', top: 30, left: 0 }}></View>
        <View style={{ backgroundColor: 'white', width: '60%', height: 8, position: 'absolute', top: 50, left: 0 }}></View>
      </View>
      <Grid>
        <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={Logo} style={{ width: 340, height: 340, marginTop: 100 }} />
        </Row>
        <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
          {loading
          ? (
            <ActivityIndicator style={{ scaleX: 1.6, scaleY: 1.6 }} size="large" color="#ffffff" />
          ) : (
            <View style={{ height: '100%', width: '80%', justifyContent: 'space-between', paddingVertical: 20 }}>
              <View />
              <View style={{ width: '100%' }}>
                <Text style={{ color: '#ffffff', fontSize: 30, textAlign: 'center' }}>CO-PILOTO</Text>
                <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 20 }}>
                  Planeje sua rota, otimize seu tempo e aproveite mais pois a vida é uma só
                </Text>
              </View>
              <DefaultButton
                type="secondary"
                title="Começar"
                style={{ marginTop: 10 }}
                onPress={async () => requestGPSPermission()}
              />
            </View>
          )}
        </Row>
      </Grid>
    </View>
  );
}

export default RootScreen;