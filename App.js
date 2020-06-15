import React from 'react';
import { YellowBox, Alert } from 'react-native';
YellowBox.ignoreWarnings([
  'Warning',
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
  `Can't perform a React state`,
  'VirtualizedLists should never be nested'
]);

import { StatusBar, ScrollView } from 'react-native';
import { Root, Container, Content, Icon, View, Text } from "native-base";
import { createAppContainer, createSwitchNavigator, NavigationActions } from 'react-navigation';
import { DefaultButton } from './src/components';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { 
  RootScreen,
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  SettingsScreen,
  SelectAddress,
  JourneysScreen,
} from './src/screens';
import { translateDate } from './src/utils';

const auxDate = new Date();

const InitDrawerNavigator = createDrawerNavigator({
  Only: {
    screen: HomeScreen,
  }
}, {
  drawerPosition: 'right',
  drawerWidth: '90%',
  contentComponent: ({ navigation }) => (
    <Container>
      <Content style={{ flex: 1, padding: 20 }}>
        <ScrollView>
          <View style={{ width: '100%',  backgroundColor: '#1d305b', padding: 8, borderRadius: 8 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#ffffff' }}>SUA VIAGEM</Text>
          </View>
          <View style={{ width: '100%', marginBottom: 16, marginTop: 10 }}>
            <Text style={{ fontSize: 18, color: '#1d305b', marginBottom: 2, textAlign: 'right' }}>
              {translateDate(auxDate)} - {auxDate.toLocaleTimeString()}
            </Text>
            <Text style={{ fontSize: 18 }}>Inicio da viagem</Text>
          </View>
          <View style={{ width: '100%', marginBottom: 16 }}>
            <Text style={{ fontSize: 18, color: '#1d305b', marginBottom: 2, textAlign: 'right' }}>
              Dentro de 3 horas
            </Text>
            <Text style={{ fontSize: 18 }}>Você estará passando por postos de descanso</Text>
          </View>
          <View style={{ width: '100%', marginBottom: 16 }}>
            <Text style={{ fontSize: 18, color: '#1d305b', marginBottom: 2, textAlign: 'right' }}>
              Dentro de 5 horas
            </Text>
            <Text style={{ fontSize: 18 }}>Você estará passando por locais com alimentos saudáveis</Text>
          </View>
          <View style={{ width: '100%', marginBottom: 16 }}>
            <Text style={{ fontSize: 18, color: '#1d305b', marginBottom: 2, textAlign: 'right' }}>
              Dentro de 6 horas
            </Text>
            <Text style={{ fontSize: 18 }}>Você chegará ao seu destino</Text>
          </View>

          <View style={{ width: '100%',  backgroundColor: '#1d305b', padding: 8, borderRadius: 8 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#ffffff' }}>INFORMAÇÕES</Text>
          </View>
          <View style={{ width: '100%', marginBottom: 16 }}>
            <Text style={{ fontSize: 18, marginTop: 10 }}>
              Atualmente, o intervalo entre o tempo de chegada/descarga dos caminhões com direção a este destino esta por volta de 3 horas
            </Text>
          </View>
          <View style={{ width: '100%', marginBottom: 16 }}>
            <DefaultButton
              type="secondary"
              title="Como usar esse tempo?"
              onPress={() => Alert.alert(
                "Aproveite seu tempo utilizando nossa plataforma",
                "Por meio da nossa plataforma você pode, no momento em que está "
                + "aguardando a descarga do caminhão, agendar teleconsultas para obter, de forma rápida, panoramas acerca de sua saúde.",
                [
                  { text: "Legal!", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              )}
            />
          </View>
          <View style={{ width: '100%', marginBottom: 16 }}>
            <DefaultButton
              title="Iniciar viagem"
              onPress={() => {
                navigation.closeDrawer();
                navigation.navigate('Journey');
              }}
            />
          </View>
        </ScrollView>
      </Content>
    </Container>
  ),
})

const HomeStackNavigator = createStackNavigator({
  Main: {
    screen: InitDrawerNavigator,
    navigationOptions: ({ loginNavigator }) => ({
      headerShown: false
    })
  },
  Address: {
    screen: SelectAddress,
    navigationOptions: ({ loginNavigator }) => ({
      headerShown: false
    })
  }
})

const AppBottomNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStackNavigator,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="radar" type="MaterialCommunityIcons" style={{ color: tintColor }} />
      ),
    },
  },
  Journey: {
    screen: JourneysScreen,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="truck-delivery" type="MaterialCommunityIcons" style={{ color: tintColor }} />
      ),
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="settings" type="MaterialCommunityIcons" style={{ color: tintColor }} />
      ),
    },
  },
}, {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#ffffff',
    inactiveTintColor: '#777777',
    style: {
      backgroundColor: '#1d305b',
      height: 60,
    }
  }
})

const InitialStackNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ loginNavigator }) => ({
      headerShown: false
    })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: ({ loginNavigator }) => ({
      headerShown: false
    })
  }
})

const AppSwitchNavigator = createSwitchNavigator({
  Root: RootScreen,
  Initial: InitialStackNavigator,
  App: AppBottomNavigator,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const App = () => (
  <Root>
    <StatusBar backgroundColor="#1d305b" />
    <AppContainer />
  </Root>
)

export default App;