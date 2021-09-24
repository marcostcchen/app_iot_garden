import React from 'react';
import { LineChart, } from "react-native-chart-kit";
// import { Avatar } from 'react-native-elements';
import { View, ScrollView, Text, Image, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { IUsuariosLoginResponse, IPlantacao } from '../../models'
import { styles } from './styles';
import * as chartConfig from './chart.config';
import * as utils from './utils';
import { getDataFetch } from '../../utils';

interface Props {
  navigation: any,
}

interface State {
  nome: String,
  isLoading: boolean,

  umidadeArChart: any,
  temperaturaChart: any,
  umidadeSoloChart: any,
  refresh: boolean,
}

export class HomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nome: "",
      isLoading: true,
      umidadeArChart: chartConfig.umidadeArData,
      temperaturaChart: chartConfig.temperaturaData,
      umidadeSoloChart: chartConfig.umidadeSoloData,

      refresh: true,
    }
  }

  componentDidMount = async () => {
    await this.setUser();
  }

  render() {
    return (
      <>
        <ScrollView refreshControl={<RefreshControl refreshing={this.state.refresh} onRefresh={this.refreshUser} />}>
          <View style={{ width: '100%', alignItems: 'center', marginTop: 15 }}>
            <View style={styles.bemVindoContainer}>
              <View style={{ width: '70%', height: '100%', justifyContent: 'center' }}>
                <Text style={styles.bemVindoText}>Bem vindo</Text>
                <Text style={styles.bemVindoNameText}>{this.state.nome}</Text>
              </View>
              <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                {/* <Avatar
                  size="medium"
                  rounded
                  source={require('../../images/avatar.png')}
                /> */}
              </View>
            </View>

            <LineChart
              data={this.state.umidadeArChart}
              width={chartConfig.screenWidth}
              height={300}
              chartConfig={chartConfig.umidadeArChartConfig}
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

            <LineChart
              data={this.state.umidadeSoloChart}
              width={chartConfig.screenWidth}
              height={300}
              chartConfig={chartConfig.umidadeSoloChartConfig}
              bezier
              verticalLabelRotation={30}
              style={styles.chart} />
          </View>

        </ScrollView>
      </>
    )
  }

  refreshUser = async () => {
    this.setState({ refresh: true });

    let login = await AsyncStorage.getItem("@loginName");
    const onSuccess = async (responseJson) => {
      await AsyncStorage.setItem("@login", JSON.stringify(responseJson));
      await this.setUser();
    }

    const onFail = () => {
      // Toast.show({ text: "Login não disponível", duration: 4000, type: "warning" });
    }

    await getDataFetch(login, onSuccess, onFail);
  }

  setUser = async () => {
    const asyncString = await AsyncStorage.getItem("@login");
    if (asyncString !== null) {
      const UsuariosLoginResponse: IUsuariosLoginResponse = JSON.parse(asyncString);

      this.setCharts(UsuariosLoginResponse.plantacoes)
      await this.checkNotifications(UsuariosLoginResponse.plantacoes);
      setTimeout(() => {
        this.setState({ nome: UsuariosLoginResponse.nome, refresh: false })
      }, 1000)
    }
  }

  checkNotifications = async (plantacoes: Map<String, IPlantacao>) => {
    await utils.checkNotifications(plantacoes);
  }

  setCharts = (plantacoes: Map<String, IPlantacao>) => {
    const umidadeArChart = {
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

    const umidadeSoloChart = {
      labels: utils.getLabels(plantacoes, "umidsolo"),
      datasets: [
        {
          data: utils.getData(plantacoes, "umidsolo")
        }
      ],
      legend: ["Umidade Solo por planta"]
    }

    this.setState({ temperaturaChart, umidadeArChart, umidadeSoloChart })
  }
}
