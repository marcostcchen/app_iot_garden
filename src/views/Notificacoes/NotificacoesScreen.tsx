import React from 'react';
import { Text } from 'react-native';

interface Props {
  navigation: any,
}

interface State {

}


export class NotificacoesScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Text>
        Ola
      </Text>
    );
  }
}
