import React from 'react';
import { LineChart, } from "react-native-chart-kit";
import { Avatar } from 'react-native-elements';
import { View, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { IUsuariosLoginResponse, IPlantacao } from '../../models'
import { LoadingScreen } from '../../components';
import { styles } from './styles';
import * as chartConfig from './chart.config';
import * as utils from './utils';

interface Props {
  navigation: any,
}

interface State {
  nome: String,
  isLoading: Boolean,

  umidadeChart: any,
  temperaturaChart: any
}

export class VisaoGeralScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nome: "",
      isLoading: true,
      umidadeChart: chartConfig.umidadeData,
      temperaturaChart: chartConfig.temperaturaData,
    }
  }

  componentDidMount = async () => {
    const asyncString = await AsyncStorage.getItem("@login");
    if (asyncString !== null) {
      const UsuariosLoginResponse: IUsuariosLoginResponse = JSON.parse(asyncString);
      this.setCharts(UsuariosLoginResponse.plantacoes)
      await this.checkNotifications(UsuariosLoginResponse.plantacoes);
      setTimeout(() => {
        this.setState({ nome: UsuariosLoginResponse.nome, isLoading: false })
      }, 1000)
    }
  }

  render() {
    return (
      <>
        <LoadingScreen isLoading={this.state.isLoading} text={"Carregando suas informações.."} />
        <ScrollView >
          <View style={{ width: '100%', alignItems: 'center', marginTop: 15 }}>
            <View style={styles.bemVindoContainer}>
              <View style={{ width: '70%', height: '100%', justifyContent: 'center' }}>
                <Text style={styles.bemVindoText}>Bem vindo</Text>
                <Text style={styles.bemVindoNameText}>{this.state.nome}</Text>
              </View>
              <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                <Avatar
                  size="medium"
                  rounded
                  source={require('../images/avatar.png')}
                />
              </View>
            </View>
            <LineChart
              data={this.state.umidadeChart}
              width={chartConfig.screenWidth}
              height={300}
              chartConfig={chartConfig.umidadeChartConfig}
              bezier
              verticalLabelRotation={30}
              style={styles.chart} />

            <LineChart
              data={this.state.temperaturaChart}
              width={chartConfig.screenWidth}
              height={300}
              chartConfig={chartConfig.temperaturaChartConfig}
              bezier
              verticalLabelRotation={30}
              style={styles.chart} />
          </View>
        </ScrollView>
      </>
    )
  }

  checkNotifications = async (plantacoes: Map<String, IPlantacao>) => {
    await utils.checkNotifications(plantacoes);
  }

  setCharts = (plantacoes: Map<String, IPlantacao>) => {
    const umidadeChart = {
      labels: utils.getLabels(plantacoes, "umid"),
      datasets: [
        {
          data: utils.getData(plantacoes, "umid")
        }
      ],
      legend: ["Umidade por planta"]
    }


    const temperaturaChart = {
      labels: utils.getLabels(plantacoes, "temp"),
      datasets: [
        {
          data: utils.getData(plantacoes, "temp")
        }
      ],
      legend: ["Temperatura por planta"]
    }

    this.setState({ temperaturaChart, umidadeChart })
  }
}
