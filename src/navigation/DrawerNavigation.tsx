import * as Views from '../views';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Header } from '../components';
import { HomeStackNavigation } from './HomeStackNavigation';

const Drawer = createDrawerNavigator();

export const DrawerNavigation: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="HomeStack" screenOptions={{ header: (props) => <Header {...props} /> }}>
      <Drawer.Screen name="HomeStack" component={HomeStackNavigation} />

    </Drawer.Navigator>
  )
}