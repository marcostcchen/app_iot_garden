import React from 'react';
import { LineChart, } from "react-native-chart-kit";
import { View, ScrollView, Text } from 'react-native';
import { styles } from './VisaoGeral.styles';
import * as chartConfig from './VisaoGeral.chart.config';
import AsyncStorage from '@react-native-community/async-storage';
import { IUsuariosLoginResponse } from '../../models'

interface Props {
  navigation: any,
}

interface State {
  nome: String,
}

export class VisaoGeralScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nome: "",
    }
  }

  componentDidMount = async () => {
    const asyncString = await AsyncStorage.getItem("@login");
    if (asyncString !== null) {
      const UsuariosLoginResponse: IUsuariosLoginResponse = JSON.parse(asyncString);
      this.setState({ nome: UsuariosLoginResponse.nome })
    }
  }

  render() {
    return (
      <ScrollView >
        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
          <View style={styles.bemVindoContainer}>
            <Text style={styles.bemVindoText}>Bem vindo {this.state.nome}</Text>
          </View>
          <LineChart
            data={chartConfig.umidadeData}
            width={chartConfig.screenWidth}
            height={300}
            chartConfig={chartConfig.umidadeChartConfig}
            bezier
            verticalLabelRotation={30}
            style={styles.chart} />

          <LineChart
            data={chartConfig.temperaturaData}
            width={chartConfig.screenWidth}
            height={300}
            chartConfig={chartConfig.temperaturaChartConfig}
            bezier
            verticalLabelRotation={30}
            style={styles.chart} />
        </View>
      </ScrollView>
    )
  }
}
