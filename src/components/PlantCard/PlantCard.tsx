import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'

interface Props {
  nome: string,
  temperatura: number,
  umidade: number,
  image: ImageSourcePropType
}

export const PlantCard: React.FC<Props> = (props: Props) => {
  const { nome, temperatura, umidade, image } = props;

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <View style={styles.circle}>
          <Image resizeMode="contain" style={{ height: 80, width: 80, borderRadius: 50 }} source={image} />
        </View>
      </View>
      <View style={{ height: '40%', width: '100%' }}>
        <Text style={[styles.text, { fontSize: 15 }]}>{nome}</Text>
        <Text style={[styles.text, { color: 'red' }]}>T: {temperatura}°C</Text>
        <Text style={[styles.text, { color: 'blue' }]}>U: {umidade}%</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    paddingLeft: 10,
    textAlign: 'left',
    margin: 10,
    borderRadius: 10,
    height: 200,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
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
  text: {
    color: "black",
    width: '100%'
  },
  imageContainer: {
    height: '60%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
