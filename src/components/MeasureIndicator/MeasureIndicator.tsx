import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  value: string,
  unit: string
  description: string,
  width?: string,
}

export const MeasureIndicator: React.FC<Props> = (props: Props) => {
  const { description, unit, value, width } = props;

  return (
    <View style={[styles.container, { width: width ? width : "100%" }]}>
      <Text style={[styles.text, { fontSize: 36, paddingLeft: 5 }]}>
        {value}
        <Text style={styles.unit}>{unit}</Text>
      </Text>
      <Text style={styles.text}>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: 'black'
  },
  unit: {
    fontSize: 16,
    textAlignVertical: 'top'
  }
})
