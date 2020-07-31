import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as View from './views';
import SplashScreen from 'react-native-splash-screen';
import { Root } from 'native-base';
import { sqlLiteThenFunctionQuery } from './utils';

const Stack = createStackNavigator();

export default class App extends React.Component {
  componentDidMount = async () => {
    SplashScreen.hide();
    await this.createTablesSqlLite();
  }

  render() {

    return (
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={View.LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Iot Garden" component={View.HomeScreen} options={{ headerLeft: null, headerTintColor: 'green' }} />
            <Stack.Screen name="Detalhes Planta" component={View.DetalhesPlantaScreen} options={{ headerShown: true, headerTintColor: 'green' }} />
            <Stack.Screen name="Configuração da Planta" component={View.ConfiguracaoPlantaScreen} options={{ headerShown: true, headerTintColor: 'green' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    )
  }
  
  createTablesSqlLite = async () => {
    const createValidadoQuery = 'CREATE TABLE IF NOT EXISTS ConfigTable(planta VARCHAR(255), tempMax VARCHAR(255), tempMin VARCHAR(255), umidMax VARCHAR(255), umidMin VARCHAR(255))';
    await sqlLiteThenFunctionQuery(createValidadoQuery, [], null);
  }
}

console.disableYellowBox = true; // <-- This is to remove the deprecated component warning
