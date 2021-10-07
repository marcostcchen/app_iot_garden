import { Heading } from 'native-base'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { LineChartCustom } from '../../components'

interface Props {

}

export const Historico: React.FC<Props> = (props: Props) => {
  return (
    <View>
      <Heading size="md" style={{ color: 'green' }}>Histórico</Heading>

      <LineChartCustom
        labels={["January", "February", "March", "April", "May", "June"]}
        dataSets={[
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
        ]}
        gradientFrom="#006f00bb"
        gradientTo="#bbff00eb"
        legend="Temperatura"
      />

      <LineChartCustom
        labels={["January", "February", "March", "April", "May", "June"]}
        dataSets={[
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
        ]}
        gradientFrom="#000be2"
        gradientTo="#0054fb"
        legend="Umidade do Ar"
      />

      <LineChartCustom
        labels={["January", "February", "March", "April", "May", "June"]}
        dataSets={[
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
        ]}
        gradientFrom="#784604"
        gradientTo="#9f8201"
        legend="Umidade do Solo"
      />

      <LineChartCustom
        labels={["January", "February", "March", "April", "May", "June"]}
        dataSets={[
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
        ]}
        gradientFrom="#fbd500"
        gradientTo="#ff5126"
        legend="Luminosidade"
      />

    </View>
  )
}

