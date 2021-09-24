import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { MainStackNavigation } from './navigation';
import { NativeBaseProvider } from 'native-base';

export const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <MainStackNavigation />
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

