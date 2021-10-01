import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { StyleSheet } from 'react-native';
import { DrawerNavigation } from '.';
import * as Views from '../views';

const Stack = createStackNavigator();

export const StackNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerTintColor: 'green', headerStyle: styles.headerStyle, }} >
      <Stack.Screen name="Login" component={Views.LoginScreen} options={{ headerShown: false, }} />
      <Stack.Screen name="Drawer" component={DrawerNavigation} options={{ headerShown: false, }} />
      <Stack.Screen name="DetalhePlanta" component={Views.DetalhesPlantaScreen} />

    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21,
  }
})

