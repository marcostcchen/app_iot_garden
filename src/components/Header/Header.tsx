import React from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { grayLight } from '../../utils';
import { styles } from './styles';

interface Props {
  navigation: any
}

export const Header: React.FC<Props> = (props: Props) => {
  const { navigation } = props;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.statusBarSpace} />
      <View style={styles.menuIconsContainer} >
        <View style={styles.hambugerIcon}>
          <Pressable
            onPress={() => navigation.openDrawer()}
          android_ripple={{ color: grayLight, radius: 30, borderless: true }}
          style={styles.button}
          >
          <Text style={{ fontSize: 24 }}>☰</Text>
        </Pressable>
      </View>
      <View style={styles.logoIcon}>
        <Image style={{ height: 50, width: 50 }} source={require("../../images/logo.png")} />
      </View>
      <View style={styles.notifIcon} />
    </View>
    </View >
  )
}
