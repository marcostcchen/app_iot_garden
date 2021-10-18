import { Heading } from 'native-base';
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MeasureIndicator } from '../../components';
import { Medicao } from '../../models'

interface Props {
  medicao: Medicao
}

export const UltimasMedicoes: React.FC<Props> = (props: Props) => {
  const { medicao } = props;
  return (
    <View>
      <Heading size="md" style={{ color: 'green' }}>Ultimas Medições</Heading>
      <View style={{ height: 10 }} />
      <View style={{ flexDirection: 'row' }}>
        <MeasureIndicator
          width={"50%"}
          unit={"°C"}
          description={"Temp."}
          value={medicao.temperatura}
        />

        <MeasureIndicator
          width={"50%"}
          unit={"%"}
          description={"Ar"}
          value={" - "}
        />
      </View>

      <View style={{ height: 10 }} />

      <View style={{ flexDirection: 'row' }}>
        <MeasureIndicator
          width={"50%"}
          unit={"%"}
          description={"Solo"}
          value={medicao.umidade}
        />

        <MeasureIndicator
          width={"50%"}
          unit={"%"}
          description={"Luz"}
          value={medicao.luminosidade}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
