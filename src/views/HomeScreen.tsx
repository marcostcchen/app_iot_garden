import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as Views from './'

interface Props {
  navigation: any,
}

interface State {

}

const Tab = createMaterialTopTabNavigator();

export class HomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Visao Geral" component={Views.VisaoGeralScreen} />
        <Tab.Screen name="Minhas Plantas" component={Views.MinhasPlantasScreen} />
      </Tab.Navigator>
    );
  }
}
