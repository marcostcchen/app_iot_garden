import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import { grayLight } from '../../utils';

interface Props {
  nome: string,
  temperatura: number,
  umidade: number,
  image: ImageSourcePropType,
  onPress: () => void
}

export const PlantCard: React.FC<Props> = (props: Props) => {
  const { nome, temperatura, umidade, image, onPress } = props;

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <View style={styles.circle}>
          <Image resizeMode="contain" style={{ height: 80, width: 80, borderRadius: 50 }} source={image} />
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ height: '30%', width: '100%', }}>
          <Text style={[styles.text, { fontSize: 15 }]}>{nome}</Text>
          <Text style={[styles.text, { color: 'red' }]}>T: {temperatura}°C</Text>
          <Text style={[styles.text, { color: 'blue' }]}>U: {umidade}%</Text>
        </View>
        <Pressable
          style={styles.detalhesButton}
          onPress={onPress}
          android_ripple={{ color: grayLight, radius: 20, borderless: true }}
        >
          <Text style={styles.buttonText}>{">"}</Text>
        </Pressable >
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
    height: 220,
    width: 160,
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
  },
  detalhesButton: {
    right: 5,
    bottom: 5,
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'brown',
    width: 40,
    height: 40,
    justifyContent: 'center'
  },
  buttonText: {
    color: "white", textAlign: 'center', fontSize: 18, fontWeight: 'bold'
  }

})
