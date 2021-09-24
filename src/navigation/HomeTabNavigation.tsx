import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import * as Views from '../views';

const Tab = createMaterialTopTabNavigator();

export const HomeTabNavigation: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Views.HomeScreen} />
      <Tab.Screen name="Minhas Plantas" component={Views.MinhasPlantasScreen} />
    </Tab.Navigator>
  )
}