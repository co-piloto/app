import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning']);

import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { 
  RootScreen,
  LoginScreen,
  RegisterScreen,
  HomeScreen,
} from './src/screens';

// const AppBottomNavigator = createBottomTabNavigator({
//   Home: {
//     screen: HomeScreen,
//     navigationOptions: {
//       tabBarLabel: null,
//       tabBarIcon: ({ tintColor }) => (
//         <Image source={require('./src/assets/images/home.png')} style={{resizeMode: 'cover', width: 40, height: 40, tintColor: tintColor}}/>
//       ),
//     },
//   },
//   Find: {
//     screen: FindScreen,
//     navigationOptions: {
//       tabBarLabel: null,
//       tabBarIcon: ({ tintColor }) => (
//         <Image source={require('./src/assets/images/radar.png')} style={{resizeMode: 'cover', width: 40, height: 40, tintColor: tintColor}}/>
//       ),
//     },
//   },
//   Perfil: {
//     screen: PerfilScreen,
//     navigationOptions: {
//       tabBarLabel: null,
//       tabBarIcon: ({ tintColor }) => (
//         <Image source={require('./src/assets/images/escudo.png')} style={{resizeMode: 'cover', width: 40, height: 40, tintColor: tintColor}}/>
//       ),
//     },
//   },
// }, {
//   tabBarOptions: {
//     showLabel: false,
//     activeTintColor: '#ff6b2a',
//     inactiveTintColor: '#989898',
//     style: {
//       backgroundColor: '#222123',
//       height: 70,
//       borderTopColor: '#222123'
//     }
//   }
// })

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
  App: HomeScreen,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;