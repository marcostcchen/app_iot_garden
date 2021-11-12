import { Button, Heading, Input } from 'native-base';
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";
import { UsuarioPlanta } from '../../models';

interface Props {
  isVisibleModal: boolean,
  setIsVisibleModal: (value: boolean) => void,
  usuarioPlanta: UsuarioPlanta,
}

export const ModalPlantConfig: React.FC<Props> = (props: Props) => {
  const { isVisibleModal, setIsVisibleModal, usuarioPlanta } = props;
  const [nome, setNome] = useState(usuarioPlanta.nome)
  const [tempMax, setTempMax] = useState(usuarioPlanta.temperatura_maxima)
  const [tempMin, setTempMin] = useState(usuarioPlanta.temperatura_minima)
  const [umidSoloIdeal, setUmidSoloIdeal] = useState(usuarioPlanta.umidade_solo_ideal)
  const [umidArIdeal, setUmidArIdeal] = useState(usuarioPlanta.umidade_ar_ideal)
  const [lumIdeal, setLumIdeal] = useState(usuarioPlanta.luminosidade_ideal)

  return (

    <Modal
      isVisible={isVisibleModal}
      onBackdropPress={() => setIsVisibleModal(false)}
      onBackButtonPress={() => setIsVisibleModal(false)}>
      <View style={styles.modal}>
        <Heading style={{ textAlign: 'center' }}>Configurações</Heading>

        <View style={{ height: 20 }} />

        <Input
          mx="4"
          size="md"
          placeholder="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />

        <View style={{ height: 10 }} />
        <Input
          mx="4"
          size="md"
          placeholder="Temperatura Máxima"
          value={tempMax}
          onChangeText={(text) => setTempMax(text)}
        />

        <View style={{ height: 10 }} />
        <Input
          mx="4"
          size="md"
          placeholder="Temperatura Mínima"
          value={tempMin}
          onChangeText={(text) => setTempMin(text)}
        />

        <View style={{ height: 10 }} />
        <Input
          mx="4"
          size="md"
          placeholder="Umidade Solo Ideal"
          value={umidSoloIdeal}
          onChangeText={(text) => setUmidSoloIdeal(text)}
        />

        <View style={{ height: 10 }} />
        <Input
          mx="4"
          size="md"
          placeholder="Umidade Ar Ideal"
          value={umidArIdeal}
          onChangeText={(text) => setUmidArIdeal(text)}
        />

        <View style={{ height: 10 }} />
        <Input
          mx="4"
          size="md"
          placeholder="Luminosidade Ideal"
          value={lumIdeal}
          onChangeText={(text) => setLumIdeal(text)}
        />

        <Button style={styles.button}>
          <Text>EDITAR</Text>
        </Button>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    width: '100%', paddingBottom: 100, backgroundColor: 'white', borderRadius: 10, paddingTop: 20,
  },
  button: {
    width: '100%', position: 'absolute', bottom: 0, height: 70, borderTopRightRadius: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: 'green'
  }
})
