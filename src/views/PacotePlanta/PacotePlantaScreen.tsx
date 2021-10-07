import { Heading } from 'native-base';
import React, { useEffect, useRef, useState } from 'react'
import { Image, Text, View, ScrollView, Pressable, Touchable, TouchableOpacity } from 'react-native'
import { MeasureIndicator } from '../../components';
import { Planta, PlantaUsuario } from '../../models';
import { getImageSource, grayLight } from '../../utils';
import RBSheet from "react-native-raw-bottom-sheet";
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyPlantsConstant } from '../../utils/storedConstants';

interface Props {
  route: any
}

export const PacotePlantaScreen: React.FC<Props> = (props: Props) => {
  const { route } = props;
  const { planta, image }: { planta: Planta, image: string } = route.params;
  const [plantasUsuario, setPlantasUsuario] = useState<Array<PlantaUsuario>>([]);

  useEffect(() => {
    getMyPlants();
  }, [])

  const getMyPlants = async () => {
    let myPlantsString = await AsyncStorage.getItem(MyPlantsConstant)
    if (myPlantsString != null) {
      let plantasUsuario: Array<PlantaUsuario> = JSON.parse(myPlantsString);
      setPlantasUsuario(plantasUsuario)
    }
  }

  const handleSetConfigOnMyPlant = () => {
    
  }

  let rbSheetRef: any = useRef();
  let imageSource = getImageSource(image);
  return (
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
              <Heading style={{ width: "80%" }} size="md">{planta.especie}</Heading>
              <Pressable
                android_ripple={{ color: grayLight, radius: 40 }}
                onPress={() => rbSheetRef.open()}
                style={styles.button}>
                <Image resizeMode="contain" style={{ height: '100%', width: '100%' }} source={require("../../images/cartIcon.png")} />
              </Pressable>
            </View>
            <View style={{ height: 20 }} />

            <Heading size="sm" style={{ color: 'green' }}>Configurações Recomendadas</Heading>
            <View style={{ height: 10 }} />
            <View style={{ flexDirection: 'row' }}>
              <MeasureIndicator
                width={"50%"}
                unit={"°C"}
                description={"Temp."}
                value={planta.temperatura_ideal}
              />

              <MeasureIndicator
                width={"50%"}
                unit={"%"}
                description={"Ar"}
                value={planta.umidade_ar_ideal}
              />
            </View>

            <View style={{ height: 10 }} />

            <View style={{ flexDirection: 'row' }}>
              <MeasureIndicator
                width={"50%"}
                unit={"%"}
                description={"Solo"}
                value={planta.umidade_solo_ideal}
              />

              <MeasureIndicator
                width={"50%"}
                unit={"%"}
                description={"Luz"}
                value={planta.luminosidade_ideal}
              />
            </View>
            <View style={{ height: 20 }} />

            <Heading size="sm" style={{ color: 'green' }}>Descrição</Heading>
            <Text style={styles.text}>{planta.descricao}</Text>

            <View style={{ height: 40 }} />
          </View>
        </View>
      </View>

      <RBSheet
        ref={ref => { rbSheetRef = ref; }}
        height={400}
        openDuration={250}
        customStyles={{ container: { justifyContent: "center", } }}
      >
        <View style={{ height: 400 }}>
          <View style={{ height: 20 }} />
          <Text style={{ color: 'gray', fontSize: 16, marginLeft: 15 }}>Selecione a planta{"\n"}para definir as configurações</Text>
          <ScrollView>
            <View style={{ alignItems: 'center' }}>
              <View style={{ height: 10 }} />
              {plantasUsuario.map((plant, index) => (
                <>
                  <TouchableOpacity
                    key={index}
                    style={styles.myPlantOptionContainer}
                    onPress={handleSetConfigOnMyPlant}
                  >
                    <Text style={styles.myPlantText}>{plant.nome}</Text>
                  </TouchableOpacity>
                </>
              ))}
            </View>
          </ScrollView>

        </View>
      </RBSheet>
    </ScrollView>
  )
}
