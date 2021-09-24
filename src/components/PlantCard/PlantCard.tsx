import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {

}

export const PlantCard: React.FC<Props> = (props: Props) => {
  return (
    <View style={styles.card}>
      <Text>Aqui</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    height: 200,
    width: 150,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  }
})
