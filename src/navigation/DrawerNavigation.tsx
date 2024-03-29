import * as Views from '../views';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { DrawerContent, Header,  } from '../components';

const Drawer = createDrawerNavigator();

export const DrawerNavigation: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ header: (props) => <Header {...props} /> }}
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Views.HomeScreen} />
    </Drawer.Navigator >
  )
}