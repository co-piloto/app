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
        <Icon name="radar" type="MaterialCommunityIcons" style={{ color: tintColor }} />
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