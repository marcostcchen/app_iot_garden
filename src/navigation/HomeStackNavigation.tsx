import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import * as Views from '../views';

const Stack = createStackNavigator();

export const HomeStackNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerTintColor: 'green' }}>
      <Stack.Screen name="Home" component={Views.HomeScreen} options={{ headerShown: false, }} />
      <Stack.Screen name="DetalhePlanta" component={Views.DetalhesPlantaScreen} />
    </Stack.Navigator>
  )
}

