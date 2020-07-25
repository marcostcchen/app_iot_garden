import React from 'react';
import { LineChart, } from "react-native-chart-kit";
import { View, Text, ScrollView } from 'react-native';
import { styles } from './VisaoGeral.styles';
import * as chartConfig from './VisaoGeral.chart.config';

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
      <ScrollView >
        <View style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
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
