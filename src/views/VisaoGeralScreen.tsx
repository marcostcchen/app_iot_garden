import React from 'react';
import { HeaderComponent, LoadingScreen } from '../components';
import { NetInfoFetch, UserMockedFetch } from '../utils';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Views from './'
interface Props {
  navigation: any,
}

interface State {

}

export class VisaoGeralScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
      </>
    )
  }
}
