import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import { grayLight } from '../../utils';

interface Props {
  nome: string,
  temperatura: string,
  ar: string,
  solo: string,
  luminosidade: string,
  image: ImageSourcePropType,
  onPress: () => void
}

export const UserPlantCard: React.FC<Props> = (props: Props) => {
  const { nome, temperatura, ar, solo, image, luminosidade, onPress } = props;

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <View style={styles.circle}>
          <Image resizeMode="contain" style={{ height: 80, width: 80, borderRadius: 50 }} source={image} />
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ height: '60%', width: '100%', }}>
          <Text style={[styles.text, { fontSize: 16 }]} numberOfLines={2} ellipsizeMode='tail'>{nome}</Text>

          <View style={{ height: 10 }} />
          <Text style={[styles.text, { color: 'gray', fontWeight: 'bold' }]}>Ultimas Medições</Text>
          <Text style={[styles.text, { color: 'red' }]}>Temp: {temperatura}°C</Text>
          <Text style={[styles.text, { color: 'blue' }]}>Ar: {ar}%</Text>
          <Text style={[styles.text, { color: 'brown' }]}>Solo: {solo}%</Text>
          <Text style={[styles.text, { color: '#8B8000' }]}>Lum: {luminosidade}%</Text>
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
    paddingRight: 10,
    textAlign: 'left',
    margin: 10,
    borderRadius: 10,
    height: 300,
    width: 200,
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
    height: '40%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  detalhesButton: {
    right: 2,
    bottom: 2,
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
