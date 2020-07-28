import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar } from 'react-native-elements';
import { LineChart } from 'react-native-chart-kit';
import * as chartConfig from './chart.config';
import { styles } from './styles';
import { IPlantacao } from '../../models';
import { LoadingScreen } from '../../components';

interface Props {
  navigation: any,
}

interface State {
  planta: IPlantacao,
  isLoading: Boolean,

}

export class DetalhesPlantaScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      planta: null,
      isLoading: true,
    }
  }

  componentDidMount = async () => {
    const AsyncString = await AsyncStorage.getItem("@selectedPlanta");
    if (AsyncString) {
      const planta: IPlantacao = JSON.parse(AsyncString);
      this.setState({ planta, isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <LoadingScreen isLoading={this.state.isLoading} text={"Carregando informações da planta..."}/>
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
            <Avatar
              size="xlarge"
              rounded
              source={require('../images/plant1.png')}
            />
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
}
