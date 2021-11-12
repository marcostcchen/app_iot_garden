import { Button, Heading, Input } from 'native-base';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";

interface Props {
  isVisibleModal: boolean,
  setIsVisibleModal: (value: boolean) => void,
}

export const ModalNewPlant: React.FC<Props> = (props: Props) => {
  const { isVisibleModal, setIsVisibleModal } = props;

  return (

    <Modal
      isVisible={isVisibleModal}
      onBackdropPress={() => setIsVisibleModal(false)}
      onBackButtonPress={() => setIsVisibleModal(false)}>
      <View style={styles.modal}>
        <Heading style={{ textAlign: 'center' }}>Cadastrar Nova Planta</Heading>

        <View style={{ height: 20 }} />

        <Input
          mx="4"
          size="md"
          placeholder="Nome"
        />

        <View style={{ height: 10 }} />
        <Input
          mx="4"
          size="md"
          placeholder="Id Planta"
        />

        <View style={{ height: 10 }} />
        <Input
          mx="4"
          size="md"
          placeholder="Temperatura Máxima"
        />

        <View style={{ height: 10 }} />
        <Input
          mx="4"
          size="md"
          placeholder="Temperatura Mínima"
        />

        <View style={{ height: 10 }} />
        <Input
          mx="4"
          size="md"
          placeholder="Umidade Solo Ideal"
        />

        <View style={{ height: 10 }} />
        <Input
          mx="4"
          size="md"
          placeholder="Umidade Ar Ideal"
        />

        <View style={{ height: 10 }} />
        <Input
          mx="4"
          size="md"
          placeholder="Luminosidade Ideal"
        />

        <Button style={styles.button}>
          <Text>Cadastrar</Text>
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
