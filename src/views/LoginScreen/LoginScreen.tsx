import React, { useState } from 'react'
import { Image, ImageBackground, StatusBar, Text, View } from 'react-native'
import { Button, Input, } from 'native-base';
import { styles } from './styles';

interface Props {
  navigation: any
}

export const LoginScreen: React.FC<Props> = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { navigation } = props;

  const handleLogin = () => {
    setIsLoading(true);

    //Fetch login

    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("Drawer")

    }, 2000)
  }

  return (
    <ImageBackground source={require("../../images/background.jpg")} style={styles.mainContainer}>
      <StatusBar translucent barStyle="dark-content" backgroundColor={'transparent'} />
      <View style={styles.blankPaddingHeader} />
      <View style={styles.logoContainer}>
        <Image style={{ height: 160, width: 160 }} source={require("../../images/logo.png")} />
        <View style={{ height: 10 }} />
        <Text style={styles.title}>Jardim Inteligente</Text>
      </View>
      <View style={{ height: 20 }} />
      <View style={styles.loginContainer}>
        <View style={styles.inputsContainer} >
          <Input size="md" style={styles.input} placeholder="Login" />
          <View style={{ height: 20 }} />
          <Input size="md" style={styles.input} placeholder="Senha" />
          <View style={{ height: 20 }} />
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              isLoading={isLoading}
              spinnerPlacement="end"
              isLoadingText=""
              onPress={handleLogin}
            >
              {!isLoading && (
                <Text style={styles.entrarText}>{">"}</Text>
              )}
            </Button>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}
