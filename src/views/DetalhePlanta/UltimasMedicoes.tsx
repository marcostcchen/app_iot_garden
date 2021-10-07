import { Heading } from 'native-base';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MeasureIndicator } from '../../components';
import { PlantaUsuario } from '../../models'

interface Props {
  plantaUsuario: PlantaUsuario
}

export const UltimasMedicoes: React.FC<Props> = (props: Props) => {
  const { plantaUsuario } = props;
  return (
    <View>
      <Heading size="md" style={{ color: 'green' }}>Ultimas Medições</Heading>
      <View style={{ height: 10 }} />
      <View style={{ flexDirection: 'row' }}>
        <MeasureIndicator
          width={"50%"}
          unit={"°C"}
          description={"Temp."}
          value={plantaUsuario.temperatura}
        />

        <MeasureIndicator
          width={"50%"}
          unit={"%"}
          description={"Ar"}
          value={plantaUsuario.umidadeAr}
        />
      </View>

      <View style={{ height: 10 }} />

      <View style={{ flexDirection: 'row' }}>
        <MeasureIndicator
          width={"50%"}
          unit={"%"}
          description={"Solo"}
          value={plantaUsuario.umidadeSolo}
        />

        <MeasureIndicator
          width={"50%"}
          unit={"%"}
          description={"Luz"}
          value={plantaUsuario.luminosidade}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
