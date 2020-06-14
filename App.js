import React from 'react';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Warning',
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
]);

import { StatusBar } from 'react-native';
import { Root, Icon } from "native-base";
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { 
  RootScreen,
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  SettingsScreen,
} from './src/screens';

const AppBottomNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" type="AntDesign" style={{ color: tintColor }} />
      ),
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="setting" type="AntDesign" style={{ color: tintColor }} />
      ),
    },
  },
  // Perfil: {
  //   screen: PerfilScreen,
  //   navigationOptions: {
  //     tabBarLabel: null,
  //     tabBarIcon: ({ tintColor }) => (
  //       <Image source={require('./src/assets/images/escudo.png')} style={{resizeMode: 'cover', width: 40, height: 40, tintColor: tintColor}}/>
  //     ),
  //   },
  // },
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