import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native'
import { Container, Content, View, Toast, Icon, Form, Item, Input, Text } from 'native-base';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { mapStyle, api_key, calculateDiff, calculateAverage } from '../utils';
import { LoadingModal, DefaultButton } from '../components';
import { Row, Grid } from 'react-native-easy-grid';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [startingCoords, setStartingCoords] = useState();
  const [endingCoords, setEndingCoords] = useState();
  const [starting, setStarting] = useState('');
  const [ending, setEnding] = useState('');
  const changeAddress = async (address, setCoords) => {
    setLoading(true);
    try {
      const params = {
        address,
        key: api_key,
      }
      const { data: { results = [] } = {} } = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params });
      const { lat: latitude, lng: longitude } = results[0].geometry.location;
      setCoords({ latitude, longitude });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.show({
        text: 'Erro ao procurar endereço',
        duration: 2000,
      })
    }
  }
  useEffect(() => {
    Geolocation.getCurrentPosition(async ({ coords }) => {
      const infos = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      }
      const params = {
        latlng: `${infos.latitude},${infos.longitude}`,
        key: api_key,
      };
      try {
        const { data: { results } = {} } = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params });
        const result = results[0].formatted_address.split('-');
        const address = `${result[0].trim()} - ${result[1].trim()}`;
        setStarting(address);
        setStartingCoords(infos);
      } catch (error) {
        Toast.show({
          text: 'Não foi possível acessar sua localização atual',
          duration: 2000,
        })
      }
      setLoading(false);
    })
  }, []);
  return (
    <>
      <ScrollView>
        <Container>
          <Content contentContainerStyle={{ flex: 1, backgroundColor: '#ffffff' }}>
            {loading && (
              <LoadingModal />
            )}
            <Grid>
              <Row style={{ height: '80%', alignItems: 'center', justifyContent: 'center' }}>
                {startingCoords ? (
                  <MapView
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    initialRegion={{
                      ...startingCoords,
                      latitudeDelta: 0,
                      longitudeDelta: 0.013,
                    }}
                    region={{
                      latitude: endingCoords
                        ? calculateAverage(startingCoords.latitude, endingCoords.latitude) : startingCoords.latitude,
                      longitude: endingCoords
                        ? calculateAverage(startingCoords.longitude, endingCoords.longitude) : startingCoords.longitude,
                      latitudeDelta: endingCoords
                        ? calculateDiff(startingCoords.latitude, endingCoords.latitude) + 0.02 : 0.013,
                      longitudeDelta: endingCoords
                        ? calculateDiff(startingCoords.longitude, endingCoords.longitude) + 0.02 : 0.013,
                    }}
                    customMapStyle={mapStyle}
                  >
                    <Marker
                      coordinate={startingCoords}
                      pinColor='#0f0f0f'
                      title="Localização atual"
                    />
                    {endingCoords && (
                      <Marker
                        coordinate={endingCoords}
                        pinColor='#0f0f0f'
                        title="Destino"
                      />
                    )}
                    {startingCoords && endingCoords && (
                      <MapViewDirections
                        origin={startingCoords}
                        destination={endingCoords}
                        strokeColor="#ffffff"
                        strokeWidth={4}
                        precision="high"
                        apikey={api_key}
                      />
                    )}
                  </MapView>
                ) : (
                  <View style={{ width: '100%', height: '100%', backgroundColor: '#1d305b' }} />
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
                    <TouchableOpacity
                      style={{ width: '100%', borderRadius: 200 }}
                      onPress={() => {
                        navigation.navigate('Address', {
                          setValue: setStarting,
                          setCoord: setStartingCoords,
                          changeAddress: changeAddress,
                        });
                      }}
                    >
                      <Input
                        style={{
                          fontSize: 16,
                          paddingLeft: 16,
                          color: '#1d305b',
                        }}
                        disabled
                        value={starting.split('-')[0]}
                        placeholder="Origem"
                        placeholderTextColor="#1d305baa"
                      />
                    </TouchableOpacity>
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
                  <Item rounded style={{ borderColor: '#1d305b', marginLeft: 0, marginBottom: 10, height: 56 }}>
                    <TouchableOpacity
                      style={{ width: '100%', borderRadius: 200 }}
                      onPress={() => {
                        navigation.navigate('Address', {
                          setValue: setEnding,
                          setCoord: setEndingCoords,
                          changeAddress: changeAddress,
                        });
                      }}
                    >
                      <Input
                        style={{
                          fontSize: 16,
                          paddingLeft: 16,
                          color: '#1d305b',
                        }}
                        value={ending.split('-')[0]}
                        disabled
                        placeholder="Destino"
                        placeholderTextColor="#1d305baa"
                      />
                    </TouchableOpacity>
                  </Item>
                  <DefaultButton
                    title="Planejar viagem"
                    onPress={() => {
                      if (startingCoords && endingCoords) navigation.openDrawer();
                      navigation.openDrawer();
                    }}
                  />
                </Form>
              </Row>
            </Grid>
          </Content>
        </Container>
      </ScrollView>
    </>
  );
}

export default HomeScreen;