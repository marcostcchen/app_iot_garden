import axios from 'axios';
import { Toast, } from 'native-base';
import React, { useEffect, useState } from 'react'
import { Image, View, ScrollView, Pressable, RefreshControl, Text, ActivityIndicator } from 'react-native'
import { ModalPlantConfig } from '../../components';
import { Medicao, UsuarioPlanta, WaterSolicitation } from '../../models';
import { apiUrl, getImageSource, getInitialMeasureIndex, grayLight, verifyIfPlantsHasWarning } from '../../utils';
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
  const [isRequiringWaterSolictation, setIsRequiringWaterSolictation] = useState(false)

  let imageSource = getImageSource(image);
  const [medicoes, setMedicoes] = useState<Array<Medicao>>(usuarioPlanta.medicoes.slice(getInitialMeasureIndex(usuarioPlanta.medicoes.length), usuarioPlanta.medicoes.length))

  useEffect(() => {
    refreshInfo();
  }, [])

  const refreshInfo = () => {
    setIsRefreshing(true);
    getLastMeasures();
  }

  const getLastMeasures = () => {
    const idUserPlant = usuarioPlanta.id;
    const path = `user/plant/${idUserPlant}`;

    const successFunc = (res) => {
      const usuarioPlanta: UsuarioPlanta = res.data;
      let medicoes = usuarioPlanta.medicoes;
      medicoes = medicoes.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

      setMedicoes(medicoes.slice(getInitialMeasureIndex(usuarioPlanta.medicoes.length), usuarioPlanta.medicoes.length))
      const warning = verifyIfPlantsHasWarning([usuarioPlanta]);
      if (warning) {
        Toast.show({ title: "Alerta!", description: warning, status: "warning", duration: 7000, placement: "top", })
      }
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

  const handleRegar = () => {
    setIsRequiringWaterSolictation(true)
    const idUserPlant = usuarioPlanta.id;
    const path = `user/plant/${idUserPlant}/water-solicitations?completo`;

    const successFunc = (res) => {
      const waterSolicitations: Array<WaterSolicitation> = res.data;
      if (waterSolicitations.find(water => water.completo == false)) {
        Toast.show({ title: "Alerta!", description: "Você já solicitou a rega!", status: "warning", duration: 3000, placement: "top", })
        setIsRequiringWaterSolictation(false)
        return;
      }

      makeRega();
      return;
    }

    const errorFunc = (err) => {
      //Qnd nao tem registro, retorna solicitacao nao encontrada
      makeRega();
      return;
    }

    axios.get(`${apiUrl}/${path}`)
      .then(successFunc)
      .catch(errorFunc);
  }

  const makeRega = () => {
    const idUserPlant = usuarioPlanta.id;
    const path = `user/plant/${idUserPlant}/water-solicitation`;

    const param = {
      hora: new Date()
    }

    const successFunc = (res) => {
      Toast.show({ title: "Sucesso", description: "Solicitação de rega enviado com sucesso!", status: "success", duration: 3000, placement: "top", })
      setIsRequiringWaterSolictation(false)
      return;
    }

    const errorFunc = (err) => {
      setIsRequiringWaterSolictation(false)
      Toast.show({ title: "Erro", description: "Não foi possível realizar a rega!", status: "error", duration: 3000, placement: "top", })
      return;
    }

    axios.post(`${apiUrl}/${path}`, param)
      .then(successFunc)
      .catch(errorFunc);
  }

  const initialValue: Medicao = {
    id: "-1",
    luminosidade: "0",
    id_usuario_planta: "0",
    created_at: "0",
    temperatura: "-1",
    umidade_ar: "0",
    umidade_solo: "0",
  }
  const ultimaMedicao = medicoes.reduce((max, medicao) => new Date(max.created_at) > new Date(medicao.created_at) ? max : medicao, initialValue);

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
              {/* <View style={{ height: 20 }} />

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
              </View> */}

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

      <View style={styles.buttonContainer}>
        <Pressable
          disabled={isRequiringWaterSolictation}
          style={styles.button}
          android_ripple={{ color: grayLight, radius: 100, borderless: true }}
          onPress={handleRegar}
        >
          {isRequiringWaterSolictation ?
            (<ActivityIndicator size="large" color="white" />)
            :
            (<Text >Regar</Text>)}
        </Pressable>
      </View>

      <ModalPlantConfig
        isVisibleModal={showModalConfig}
        setIsVisibleModal={setShowModalConfig}
        usuarioPlanta={usuarioPlanta}
      />
    </>
  )
}
