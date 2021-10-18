import axios from 'axios';
import { Heading, Toast, } from 'native-base';
import React, { useState } from 'react'
import { Image, View, ScrollView, Pressable, RefreshControl } from 'react-native'
import { ModalPlantConfig } from '../../components';
import { Medicao, UsuarioPlanta } from '../../models';
import { apiUrl, getImageSource, grayLight } from '../../utils';
import { Historico } from './Historico';
import { styles } from './styles';
import { UltimasMedicoes } from './UltimasMedicoes';

interface Props {
  route: any,
}

export const DetalhesPlantaScreen: React.FC<Props> = (props: Props) => {
  const { route } = props;
  const { usuarioPlanta, image }: { usuarioPlanta: UsuarioPlanta, image: string } = route.params;
  const [showModalConfig, setShowModalConfig] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  let imageSource = getImageSource(image);
  const [medicoes, setMedicoes] = useState<Array<Medicao>>(usuarioPlanta.medicoes)

  const refreshInfo = () => {
    setIsRefreshing(true);
    getLastMeasures();
  }

  const getLastMeasures = () => {
    const idUserPlant = usuarioPlanta.id;
    const path = `user/plant/${idUserPlant}/measurements`;

    const successFunc = (res) => {
      const medicoes = res.data;
      setMedicoes(medicoes)
      setIsRefreshing(false)
    }

    const errorFunc = (err) => {
      setIsRefreshing(false)
      Toast.show({ title: "Erro!", description: "Ocorreu um erro ao listar as plantas!", status: "error", duration: 3000, placement: "top", })
      return;
    }

    axios.get(`${apiUrl}/${path}`)
      .then(successFunc)
      .catch(errorFunc);
  }

  const ultimaMedicao = medicoes.reduce((max, medicao) => new Date(max.created_at) > new Date(medicao.created_at) ? max : medicao);

  return (
    <>
      <ScrollView
        style={{ backgroundColor: 'white' }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshInfo}
          />}
      >
        <View style={styles.mainContainer}>
          <View style={styles.imageContainer}>
            <View style={styles.circle}>
              <Image resizeMode="contain" style={{ height: 150, width: 150, borderRadius: 50 }} source={imageSource} />
            </View>
            <View style={{ height: 40 }} />
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.overview}>
              <View style={{ height: 20 }} />

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '80%' }}>
                  <Heading size="md" >{usuarioPlanta.nome}</Heading>
                </View>
                <View style={styles.threedotsContainer}>
                  <Pressable
                    style={styles.threedotsButton}
                    android_ripple={{ color: grayLight, radius: 20, borderless: true }}
                    onPress={() => setShowModalConfig(true)}
                  >
                    <Image resizeMode="contain" style={{ width: '100%', height: '100%' }} source={require("../../images/threedots.png")} />
                  </Pressable>
                </View>
              </View>

              <View style={{ height: 10 }} />

              <UltimasMedicoes
                medicao={ultimaMedicao} />

              <View style={{ height: 20 }} />

              <Historico
                medicoes={medicoes}
              />

            </View>
            <View style={{ height: 80 }} />
          </View>
        </View>
      </ScrollView>

      <ModalPlantConfig
        isVisibleModal={showModalConfig}
        setIsVisibleModal={setShowModalConfig}
        usuarioPlanta={usuarioPlanta}
      />
    </>
  )
}
