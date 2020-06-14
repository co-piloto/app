import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native'
import { Container, Content, View, Toast, Icon, Form, Item, Input } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { mapStyle } from '../utils';
import { LoadingModal, DefaultButton } from '../components';
import { Row, Grid } from 'react-native-easy-grid';
import axios from 'axios';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState();
  const [starting, setStarting] = useState('');
  const [ending, setEnding] = useState('');
  useEffect(() => {
    Geolocation.getCurrentPosition(async ({ coords }) => {
      const infos = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      }
      const params = {
        latlng: `${infos.latitude},${infos.longitude}`,
        key: 'AIzaSyA67FmiLgtRZCquTyzzedmcYJsegGv6E8Y',
      };
      try {
        const { data: { results } = {} } = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params });
        const result = results[0].formatted_address.split('-');
        const address = `${result[0].trim()} - ${result[1].trim()}`;
        setStarting(address);
      } catch (error) {
        Toast.show({
          text: 'Não foi possível acessar sua localização atual',
          duration: 2000,
        })
      }
      setCoords(infos);
      setLoading(false);
    })
  }, []);
  return (
    <ScrollView>
      <Container>
        <Content contentContainerStyle={{ flex: 1, backgroundColor: '#ffffff' }}>
          {loading && (
            <LoadingModal />
          )}
          <Grid>
            <Row style={{ height: '80%', alignItems: 'center', justifyContent: 'center' }}>
              {coords && (
                <MapView
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  initialRegion={{
                    ...coords,
                    latitudeDelta: 0,
                    longitudeDelta: 0.01,
                  }}
                  customMapStyle={mapStyle}
                >
                  <Marker
                    coordinate={coords}
                    pinColor='#0f0f0f'
                    title="Localização atual"
                  />
                </MapView>
              )}
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '94%',
                  backgroundColor: '#ffffff',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  marginTop: 10,
                  borderRadius: 100,
                }}
              >
                <Item rounded style={{ borderColor: '#1d305b', marginLeft: 0, marginVertical: 10, width: '80%' }}>
                  <Input
                    style={{
                      fontSize: 16,
                      paddingLeft: 16,
                      color: '#1d305b',
                    }}
                    value={starting}
                    onChangeText={text => setStarting(text)}
                    placeholder="Origem"
                    placeholderTextColor="#1d305baa"
                  />
                </Item>
                <Icon
                  name="right"
                  type="AntDesign"
                  color="#1d305b"
                  style={{ marginRight: 20 }}
                />
              </View>
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Form style={{ width: '80%' }}>
                <Item rounded style={{ borderColor: '#1d305b', marginLeft: 0, marginBottom: 10 }}>
                  <Input
                    style={{
                      fontSize: 16,
                      paddingLeft: 16,
                      color: '#1d305b',
                    }}
                    value={ending}
                    onChangeText={text => setEnding(text)}
                    placeholder="Destino"
                    placeholderTextColor="#1d305baa"
                  />
                </Item>
                <DefaultButton title="Calcular rota" />
              </Form>
            </Row>
          </Grid>
        </Content>
      </Container>
    </ScrollView>
  );
}

export default HomeScreen;