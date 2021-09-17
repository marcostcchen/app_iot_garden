import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { Root, Badge } from 'native-base';
import { TouchableOpacity, Image, Text, LogBox } from 'react-native';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { MainStackNavigation } from './navigation';

export const App: React.FC = () => {
  const [badgeValue, setBadgeValue] = useState(0)

  useEffect(() => {
    SplashScreen.hide();
    updateBadge();
  }, [])


  const headerRight = (navigation, route) => (
    <View style={{ width: '100%', flexDirection: 'row' }}>
      <TouchableOpacity style={{ height: 20, width: 20, marginRight: 20, marginTop: 5 }} onPress={updateBadge}>
        <Image style={{ height: '100%', width: '100%' }} source={require('./images/refreshButtonDark.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={{ height: 20, width: 20, marginRight: 20, marginTop: 5 }} onPress={() => navigation.navigate("Notificações")}>
        <Image style={{ height: '100%', width: '100%' }} source={require('./images/notificationIcon.png')} />
        <Badge style={{ position: "absolute", right: -5, top: -5, height: 20, width: 20 }} warning >
          <Text>{badgeValue}</Text>
        </Badge>
      </TouchableOpacity>
    </View>
  )

  const updateBadge = async () => {
    let badgeValue = await AsyncStorage.getItem("@badgeValue");
    if (badgeValue) {
      setBadgeValue(Number(badgeValue));
    }
  }

  return (
    <Root>
      <NavigationContainer>
        <MainStackNavigation />
      </NavigationContainer>
    </Root>
  )
}

