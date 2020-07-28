import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  navigation: any,
}

interface State {

}

export class DetalhesPlantaScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Detalhe da plantinha</Text>
      </View>
    );
  }
}
