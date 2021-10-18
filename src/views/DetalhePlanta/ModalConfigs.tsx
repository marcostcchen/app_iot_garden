import { Button, FormControl, Input, Modal } from 'native-base'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { UsuarioPlanta } from '../../models'

interface Props {
  showModalConfig: boolean,
  setShowModalConfig: (value: boolean) => void,
  usuarioPlanta: UsuarioPlanta
}

export const ModalConfigs: React.FC<Props> = (props: Props) => {
  const { usuarioPlanta, setShowModalConfig, showModalConfig } = props;
  return (
    <Modal isOpen={showModalConfig} onClose={() => setShowModalConfig(false)}>
      <Modal.Content width="90%">
        <Modal.CloseButton />
        <Modal.Header>Configurações</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input fontSize={14} value={usuarioPlanta.nome} />
          </FormControl>

          <FormControl mt="3">
            <FormControl.Label>Temperatura Máxima</FormControl.Label>
            <Input fontSize={14} value={usuarioPlanta.temperaturaMaxima} />
          </FormControl>

          <FormControl mt="3">
            <FormControl.Label>Temperatura Mínima</FormControl.Label>
            <Input fontSize={14} value={usuarioPlanta.temperaturaMaxima} />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModalConfig(false)
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                setShowModalConfig(false)
              }}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

const styles = StyleSheet.create({})
