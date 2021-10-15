import { Heading, } from 'native-base';
import React, { useState } from 'react'
import { Image, View, ScrollView, Pressable } from 'react-native'
import { MeasureIndicator } from '../../components';
import { UsuarioPlanta } from '../../models';
import { getImageSource, grayLight } from '../../utils';
import { Historico } from './Historico';
import { ModalConfigs } from './ModalConfigs';
import { styles } from './styles';
import { UltimasMedicoes } from './UltimasMedicoes';

interface Props {
  route: any,
}

export const DetalhesPlantaScreen: React.FC<Props> = (props: Props) => {
  const { route } = props;
  const { UsuarioPlanta, image }: { UsuarioPlanta: UsuarioPlanta, image: string } = route.params;
  const [showModalConfig, setShowModalConfig] = useState(false);

  let imageSource = getImageSource(image);

  return (
    <>
      <ScrollView style={{ backgroundColor: 'white' }}>
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
                  <Heading size="md" >{UsuarioPlanta.nome}</Heading>
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

              <UltimasMedicoes UsuarioPlanta={UsuarioPlanta} />

              <View style={{ height: 20 }} />

              <Historico />

            </View>
            <View style={{ height: 80 }} />
          </View>
        </View>
      </ScrollView>

      <ModalConfigs
        UsuarioPlanta={UsuarioPlanta}
        setShowModalConfig={setShowModalConfig}
        showModalConfig={showModalConfig}
      />
    </>
  )
}
