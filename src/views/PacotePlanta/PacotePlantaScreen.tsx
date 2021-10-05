import { Heading } from 'native-base';
import React from 'react'
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import { MeasureIndicator } from '../../components';
import { Pacote } from '../../models';
import { getImageSource } from '../../utils';

interface Props {
  route: any
}

export const PacotePlantaScreen: React.FC<Props> = (props: Props) => {
  const { route } = props;
  const { pacote, image }: { pacote: Pacote, image: string } = route.params;

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
            <Heading size="md">{pacote.especie}</Heading>
            <View style={{ height: 20 }} />

            <Heading size="sm" style={{ color: 'green' }}>Configurações Recomendadas</Heading>
            <View style={{ height: 10 }} />
            <View style={{ flexDirection: 'row' }}>
              <MeasureIndicator
                width={"50%"}
                unit={"°C"}
                description={"Temp."}
                value={pacote.temperatura_ideal}
              />

              <MeasureIndicator
                width={"50%"}
                unit={"%"}
                description={"Ar"}
                value={pacote.umidade_ar_ideal}
              />
            </View>

            <View style={{ height: 10 }} />

            <View style={{ flexDirection: 'row' }}>
              <MeasureIndicator
                width={"50%"}
                unit={"%"}
                description={"Solo"}
                value={pacote.umidade_solo_ideal}
              />

              <MeasureIndicator
                width={"50%"}
                unit={"%"}
                description={"Luz"}
                value={pacote.luminosidade_ideal}
              />
            </View>
            <View style={{ height: 20 }} />

            <Heading size="sm" style={{ color: 'green' }}>Descrição</Heading>
            <Text style={styles.text}>{pacote.descricao}</Text>


            <View style={{ height: 40 }} />
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
  text: {
    color: 'gray',
    textAlign: 'justify',
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
