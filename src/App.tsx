import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as View from './views';
import SplashScreen from 'react-native-splash-screen';
import { Root } from 'native-base';
import { TouchableOpacity, Image } from 'react-native';

const Stack = createStackNavigator();

export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {

    return (
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={View.LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Iot Garden" component={View.HomeScreen} options={{ headerLeft: null, headerTintColor: 'green' }} />
            <Stack.Screen name="Detalhes Planta" component={View.DetalhesPlantaScreen} options={{ headerShown: true, headerTintColor: 'green' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    )
  }
}

console.disableYellowBox = true; // <-- This is to remove the deprecated component warning
