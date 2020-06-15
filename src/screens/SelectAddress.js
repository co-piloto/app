import React from 'react';
import { View, Text, Content, Container } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { api_key } from '../utils';
import { DefaultButton } from '../components';

const SelectAddress = ({ navigation }) => {
  const setValue = navigation.getParam('setValue');
  const setCoord = navigation.getParam('setCoord');
  const changeAddess = navigation.getParam('changeAddress');
  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1, backgroundColor: '#ffffff' }}>
        <GooglePlacesAutocomplete
          placeholder='Endereço'
          onPress={({ description = '' }, details = null) => {
            setValue(description);
            changeAddess(description, setCoord);
            navigation.navigate('Main');
          }}
          textInputProps={{
            autoFocus: true,
          }}
          query={{
            key: api_key,
            language: 'pt-BR',
          }}
          styles={{
            textInputContainer: {
              width: '100%',
              height: 66,
              backgroundColor: '#1d305b',
              borderColor: '#1d305b',
            },
            textInput: {
              height: 50,
              fontSize: 18,
              borderRadius: 200,
              borderWidth: 1,
              borderColor: '#1d305b',
              paddingLeft: 20,
            },
            description: {
              fontWeight: '300',
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}
        />
        <View style={{ width: '80%', alignSelf: 'center', paddingBottom: 20 }}>
          <DefaultButton title="Voltar" type="secondary" onPress={() => navigation.navigate('Main')} />
        </View>
      </Content>
    </Container>
  );
}

export default SelectAddress;