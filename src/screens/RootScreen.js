import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { View, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { Logo } from '../assets';
import { DefaultButton } from '../components';
import { Row, Grid } from 'react-native-easy-grid';

const RootScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem('session').then(session => {
      if (session) navigation.navigate('App')
      setLoading(false);
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {/* <Image source={Fundo_1} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} /> */}
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
                <Text style={{ color: '#ffffff', fontSize: 30, textAlign: 'center' }}>NOME DO APP</Text>
                <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 20 }}>
                  Planeje sua rota, otimize seu tempo e aproveite mais pois a vida é uma só
                </Text>
              </View>
              <DefaultButton
                type="secondary"
                title="Começar"
                style={{ marginTop: 10 }}
                onPress={() => navigation.navigate('Initial')}
              />
            </View>
          )}
        </Row>
      </Grid>
    </View>
  );
}

export default RootScreen;