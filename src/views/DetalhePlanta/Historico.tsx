import { Heading } from 'native-base'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

interface Props {

}

export const Historico: React.FC<Props> = (props: Props) => {
  return (
    <View>
      <Heading size="md" style={{ color: 'green' }}>Histórico</Heading>

      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 30,
                Math.random() * 30,
                Math.random() * 30,
                Math.random() * 30,
                Math.random() * 30,
                Math.random() * 30
              ]
            }
          ],
          legend: ["Temperatura"]
        }}
        width={Dimensions.get("window").width * 0.9} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix="°C"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e27500",
          backgroundGradientFrom: "#006f00bb",
          backgroundGradientTo: "#bbff00eb",
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
          borderRadius: 16
        }}
      />


      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 30,
                Math.random() * 30,
                Math.random() * 30,
                Math.random() * 30,
                Math.random() * 30,
                Math.random() * 30
              ]
            }
          ],
          legend: ["Umidade Ar"]
        }}
        width={Dimensions.get("window").width * 0.9} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix="°C"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#000be2",
          backgroundGradientFrom: "#0054fb",
          backgroundGradientTo: "#26f4ff",
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
          borderRadius: 16
        }}
      />


      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 30,
                Math.random() * 30,
                Math.random() * 30,
                Math.random() * 30,
                Math.random() * 30,
                Math.random() * 30
              ]
            }
          ],
          legend: ["Umidade Solo"]
        }}
        width={Dimensions.get("window").width * 0.9} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix="°C"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e27500",
          backgroundGradientFrom: "#784604",
          backgroundGradientTo: "#9f8201",
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
          borderRadius: 16
        }}
      />


      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 30,
                Math.random() * 30,
                Math.random() * 30,
                Math.random() * 30,
                Math.random() * 30,
                Math.random() * 30
              ]
            }
          ],
          legend: ["Luminosidade"]
        }}
        width={Dimensions.get("window").width * 0.9} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix="°C"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e27500",
          backgroundGradientFrom: "#fbd500",
          backgroundGradientTo: "#ff5126",
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
          borderRadius: 16
        }}
      />
    </View>
  )
}

