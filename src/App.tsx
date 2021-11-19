import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { StackNavigation } from './navigation';
import { NativeBaseProvider } from 'native-base';

export const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

