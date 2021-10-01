import { Heading } from 'native-base';
import React from 'react'
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import { MeasureIndicator } from '../../components';

interface Props {

}

export const DetalhesPlantaScreen: React.FC<Props> = (props: Props) => {
  const { } = props;

  const plantaDetail = {
    temperatura: 30,
    umidadeAr: 20,
    umidadeSolo: 40,
    luminosidade: 30,
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.circle}>
            <Image resizeMode="contain" style={{ height: 150, width: 150, borderRadius: 50 }} source={require("../../images/plant1.png")} />
          </View>
          <View style={{ height: 40 }} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.overview}>

            <View style={{ height: 20 }} />
            <Heading size="md">Ultimas Medições</Heading>
            <View style={{ height: 10 }} />
            <View style={{ flexDirection: 'row' }}>
              <MeasureIndicator
                width={"50%"}
                unit={"°C"}
                description={"Temp."}
                value={plantaDetail.temperatura}
              />

              <MeasureIndicator
                width={"50%"}
                unit={"%"}
                description={"Ar"}
                value={plantaDetail.umidadeAr}
              />
            </View>

            <View style={{ height: 10 }} />

            <View style={{ flexDirection: 'row' }}>
              <MeasureIndicator
                width={"50%"}
                unit={"%"}
                description={"Solo"}
                value={plantaDetail.umidadeSolo}
              />

              <MeasureIndicator
                width={"50%"}
                unit={"%"}
                description={"Luz"}
                value={plantaDetail.luminosidade}
              />
            </View>

            <View style={{ height: 20 }} />
            <Heading size="md">Histórico</Heading>
          </View>
        </View>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  imageContainer: {
    paddingTop: 30,
    backgroundColor: 'rgb(81, 149, 97)',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    borderRadius: 50,
    padding: 10,
    shadowColor: "#000",
    backgroundColor: "white",

    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 5,
  },
  infoContainer: {
    marginTop: -10,
    alignItems: "center",
    minHeight: 300,
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  overview: {
    width: "90%",
  },
  title: {
    height: 30,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  }
})
