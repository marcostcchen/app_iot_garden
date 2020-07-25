import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as View from './views';
import SplashScreen from 'react-native-splash-screen';
import { TouchableOpacity } from 'react-native'

const Stack = createStackNavigator();

export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={View.LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Smart Garden" component={View.HomeScreen} options={{ headerLeft: null, headerTintColor: 'green' }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

console.disableYellowBox = true; // <-- This is to remove the react-navigation-swiper deprecated component warning
