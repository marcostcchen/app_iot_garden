import { Heading } from 'native-base';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MeasureIndicator } from '../../components';
import { UsuarioPlanta } from '../../models'

interface Props {
  UsuarioPlanta: UsuarioPlanta
}

export const UltimasMedicoes: React.FC<Props> = (props: Props) => {
  const { UsuarioPlanta } = props;
  return (
    <View>
      <Heading size="md" style={{ color: 'green' }}>Ultimas Medições</Heading>
      <View style={{ height: 10 }} />
      <View style={{ flexDirection: 'row' }}>
        <MeasureIndicator
          width={"50%"}
          unit={"°C"}
          description={"Temp."}
          value={UsuarioPlanta.temperatura}
        />

        <MeasureIndicator
          width={"50%"}
          unit={"%"}
          description={"Ar"}
          value={UsuarioPlanta.umidadeAr}
        />
      </View>

      <View style={{ height: 10 }} />

      <View style={{ flexDirection: 'row' }}>
        <MeasureIndicator
          width={"50%"}
          unit={"%"}
          description={"Solo"}
          value={UsuarioPlanta.umidadeSolo}
        />

        <MeasureIndicator
          width={"50%"}
          unit={"%"}
          description={"Luz"}
          value={UsuarioPlanta.luminosidade}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
