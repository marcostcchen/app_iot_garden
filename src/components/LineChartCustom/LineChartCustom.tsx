import React from 'react'
import { Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

interface Props {
  labels: Array<any>,
  dataSets: any,
  gradientFrom: string,
  gradientTo: string,
  legend: string,
  unit: string
}

export const LineChartCustom: React.FC<Props> = (props: Props) => {
  const { dataSets, labels, gradientFrom, gradientTo, legend, unit } = props;

  return (
    <LineChart
      data={{
        labels: labels,
        datasets: dataSets,
        legend: [legend]
      }}
      width={Dimensions.get("window").width * 0.9} // from react-native
      height={220}
      yAxisLabel=""
      yAxisSuffix={unit}
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#e27500",
        backgroundGradientFrom: gradientFrom,
        backgroundGradientTo: gradientTo,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#070401"
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        
        elevation: 4,
      }}
    />

  )
}
