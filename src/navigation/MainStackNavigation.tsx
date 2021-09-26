import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { DrawerNavigation } from '.';
import * as Views from '../views';

const Stack = createStackNavigator();

export const MainStackNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerTintColor: 'green' }}>
      <Stack.Screen name="Login" component={Views.LoginScreen} options={{ headerShown: false, }} />
      <Stack.Screen name="Drawer" component={DrawerNavigation} options={{ headerShown: false, }} />
    </Stack.Navigator>
  )
}

