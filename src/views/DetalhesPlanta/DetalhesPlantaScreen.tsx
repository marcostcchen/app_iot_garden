import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar } from 'react-native-elements';
import { LineChart } from 'react-native-chart-kit';
import * as chartConfig from './chart.config';
import { styles } from './styles';
import { IPlantacao, ISensor } from '../../models';
import { LoadingScreen } from '../../components';
import * as utils from './utils';

interface Props {
  navigation: any,
}

interface State {
  planta: IPlantacao,
  isLoading: Boolean,
  image: any,

  umidadeData: any;
  temperaturaData: any;

  ultimaMedicaoUmid: Number;
  ultimaMedicaoTemp: Number;

}

export class DetalhesPlantaScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      planta: null,
      isLoading: true,
      image: null,

      umidadeData: chartConfig.umidadeData,
      temperaturaData: chartConfig.temperaturaData,
      ultimaMedicaoUmid: 0,
      ultimaMedicaoTemp: 0,
    }
  }

  componentDidMount = async () => {
    const AsyncPlanta = await AsyncStorage.getItem("@selectedPlanta");
    const AsyncImageIndex = await AsyncStorage.getItem("@selectedPlantaImg");
    if (AsyncPlanta && AsyncImageIndex) {
      const planta: IPlantacao = JSON.parse(AsyncPlanta);
      const image = utils.getImage(Number(AsyncImageIndex))
      this.setChartsData(planta);
      this.setState({ planta, isLoading: false, image });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <LoadingScreen isLoading={this.state.isLoading} text={"Carregando informações da planta..."} />
      )
    }

    return (
      <ScrollView>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ flex: 1, width: '100%', alignItems: 'flex-end', marginTop: 15 }}>
            <TouchableOpacity style={{ height: 20, width: 40 }} onPress={this.navigateToConfigPlanta}>
              <Image resizeMode='contain' source={require('../images/threedots.png')} style={{ height: 20, width: '100%' }} />
            </TouchableOpacity>
          </View>

          <View style={{ width: '70%', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
            <Avatar size="xlarge" rounded source={this.state.image} />
            <Text style={{ marginTop: 10, fontSize: 24, color: 'gray' }}>{this.state.planta.planta}</Text>
          </View>

          <View style={styles.topInfo}>
            <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
              <Text style={[styles.topInfoText, { color: 'blue' }]}>Umidade</Text>
            </View>
          </View>

          <LineChart
            fromZero
            data={this.state.umidadeData}
            width={chartConfig.screenWidth}
            height={300}
            chartConfig={chartConfig.umidadeChartConfig}
            bezier
            verticalLabelRotation={30}
            style={styles.chart} />

          <View style={styles.bottomInfo}>
            <View style={{ width: '60%', height: '100%', justifyContent: 'center' }}>
              <Text style={styles.bemVindoText}>Últma medição:</Text>
            </View>
            <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={[styles.ultimaMedicao, { color: "blue" }]}>{this.state.ultimaMedicaoUmid}%</Text>
            </View>
          </View>

          <View style={styles.topInfo}>
            <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
              <Text style={[styles.topInfoText, { color: 'red' }]}>Temperatura</Text>
            </View>
          </View>

          <LineChart
            fromZero
            data={this.state.temperaturaData}
            width={chartConfig.screenWidth}
            height={300}
            chartConfig={chartConfig.temperaturaChartConfig}
            bezier
            verticalLabelRotation={30}
            style={styles.chart} />


          <View style={styles.bottomInfo}>
            <View style={{ width: '60%', height: '100%', justifyContent: 'center' }}>
              <Text style={styles.bemVindoText}>Últma medição:</Text>
            </View>
            <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={[styles.ultimaMedicao, { color: "red" }]}>{this.state.ultimaMedicaoTemp}°C</Text>
            </View>
          </View>

          <View style={{ height: 30 }} />

        </View>
      </ScrollView>
    );
  }

  navigateToConfigPlanta = async () => {
    await AsyncStorage.setItem("@selectedPlanta", JSON.stringify(this.state.planta));

    // Fazer as configs da planta

    this.props.navigation.navigate("ConfigPlanta");
  }

  setChartsData = (planta: IPlantacao) => {
    const sensores: Array<ISensor> = Object.values(planta.sensores);

    let umidadeLabel: Array<String> = [];
    let umidadeValues: Array<Number> = [];
    let temperaturaLabel: Array<String> = [];
    let temperaturaValues: Array<Number> = [];
    let ultimaMedicaoTemp: Number = 0;
    let ultimaMedicaoUmid: Number = 0;

    sensores.map((sensor) => {
      if (sensor.tipoSensor == "temp" || sensor.tipoSensor == "umid/temp") {
        const entries = Object.entries(sensor.medicoes);
        entries.map((medicao, index) => {
          let tempo = new Date(Number(medicao[0]))
          temperaturaLabel.push(`${tempo.getHours()}:${tempo.getMinutes()}`);
          temperaturaValues.push(Number(medicao[1].temp));
          if (index == entries.length - 1) {
            ultimaMedicaoTemp = Number(medicao[1].temp);
          }
        })
      }

      if (sensor.tipoSensor == "umid" || sensor.tipoSensor == "umid/temp") {
        const entries = Object.entries(sensor.medicoes);
        entries.map((medicao, index) => {
          let tempo = new Date(Number(medicao[0]))
          umidadeLabel.push(`${tempo.getHours()}:${tempo.getMinutes()}`);
          umidadeValues.push(Number(medicao[1].umid));
          if (index == entries.length - 1) {
            ultimaMedicaoUmid = Number(medicao[1].umid);
          }
        })
      }

    })

    let temperaturaData = {
      labels: temperaturaLabel,
      datasets: [
        {
          data: temperaturaValues,
        }
      ],
    }

    let umidadeData = {
      labels: umidadeLabel,
      datasets: [
        {
          data: umidadeValues,
        }
      ],
    }

    this.setState({ umidadeData, temperaturaData, ultimaMedicaoUmid, ultimaMedicaoTemp })
  }
}