import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { HomeTabNavigation } from '.';
import * as Views from '../views';

const Stack = createStackNavigator();

export const MainStackNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, headerTintColor: 'green' }}>
      <Stack.Screen name="Login" component={Views.LoginScreen} />
      <Stack.Screen name="Iot Garden" component={HomeTabNavigation} />
      <Stack.Screen name="Detalhes Planta" component={Views.DetalhesPlantaScreen} />
      <Stack.Screen name="Notificações" component={Views.NotificacoesScreen} />
      <Stack.Screen name="Configuração da Planta" component={Views.ConfiguracaoPlantaScreen} />
    </Stack.Navigator>
  )
}

