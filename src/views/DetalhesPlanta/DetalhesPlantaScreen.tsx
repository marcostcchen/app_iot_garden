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
import { SensorType } from '../../types/SensorType';

interface Props {
  navigation: any,
}

interface State {
  planta: IPlantacao,
  isLoading: Boolean,
  image: any,

}

export class DetalhesPlantaScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      planta: null,
      isLoading: true,
      image: null,
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
            <TouchableOpacity style={{ height: 20, width: 40 }} onPress={() => console.log('clicou')}>
              <Image resizeMode='contain' source={require('../images/threedots.png')} style={{ height: 20, width: '100%' }} />
            </TouchableOpacity>
          </View>

          <View style={{ width: '70%', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
            <Avatar size="xlarge" rounded source={this.state.image} />
            <Text style={{ marginTop: 10, fontSize: 24, color: 'gray' }}>{this.state.planta.planta}</Text>
          </View>

          <LineChart
            data={chartConfig.umidadeData}
            width={chartConfig.screenWidth}
            height={250}
            chartConfig={chartConfig.umidadeChartConfig}
            bezier
            verticalLabelRotation={30}
            style={styles.chart} />

          <LineChart
            data={chartConfig.umidadeData}
            width={chartConfig.screenWidth}
            height={250}
            chartConfig={chartConfig.temperaturaChartConfig}
            bezier
            verticalLabelRotation={30}
            style={styles.chart} />
        </View>
      </ScrollView>
    );
  }

  setChartsData = (planta: IPlantacao) => {
    const sensores: Array<ISensor> = Object.values(planta.sensores);

    let umidadeLabel: Array<Date> = []
    let umidadeData: Array<Number> = []
    let temperaturaLabel: Array<Date> = []
    let temperaturaData: Array<Number> = []
    sensores.map((sensor) => {
      if (sensor.tipoSensor == "temp" || sensor.tipoSensor == "umid/temp") {
        const entries = Object.entries(sensor.medicoes);
        entries.map((medicao) => {
          temperaturaLabel.push(new Date(Number(medicao[0])))
          console.log(temperaturaLabel)
        })
      }

      if (sensor.tipoSensor == "umid" || sensor.tipoSensor == "umid/temp") {

      }
    })
  }
}