import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { DrawerNavigation } from '.';
import { UserConstant } from '../utils';
import * as Views from '../views';

const Stack = createStackNavigator();

export const StackNavigation: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    verifyLogged()
  }, [])

  const verifyLogged = async () => {
    const logged = await AsyncStorage.getItem(UserConstant);
    if (logged) setIsLogged(true)
  }


  return (
    <Stack.Navigator initialRouteName={isLogged ? "Login" : "Drawer"} screenOptions={{ headerTintColor: 'green', headerStyle: styles.headerStyle, }} >
      <Stack.Screen name="Login" component={Views.LoginScreen} options={{ headerShown: false, }} />
      <Stack.Screen name="Drawer" component={DrawerNavigation} options={{ headerShown: false, }} />
      <Stack.Screen name="DetalhePlanta" component={Views.DetalhesPlantaScreen} options={{ title: "Detalhe da Planta" }} />
      <Stack.Screen name="PacotePlanta" component={Views.PacotePlantaScreen} options={{ title: "Pacote da Planta" }} />
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

