import React, { useRef, useState } from 'react'
import { Image, ImageBackground, Keyboard, StatusBar, Text, Vibration, View } from 'react-native'
import { Button, Input, Toast, } from 'native-base';
import { styles } from './styles';
import { apiUrl, UserConstant } from '../../utils';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Props {
  navigation: any
}

export const LoginScreen: React.FC<Props> = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const { navigation } = props;

  let senhaRef: any = useRef();

  const handleLogin = () => {
    setIsLoading(true);
    const path = 'login';

    const successFunc = async (res) => {
      const user = res.data;
      await AsyncStorage.setItem(UserConstant, JSON.stringify(user));
      setIsLoading(false);
      navigation.navigate("Drawer")
    }

    const errorFunc = (err) => {
      setIsLoading(false);
      Toast.show({ title: "Erro!", description: "Login inválido!", status: "error", duration: 3000, placement: "top", })
      Vibration.vibrate();
      return;
    }

    let params = {
      nome: login,
      senha: senha
    }

    axios.post(`${apiUrl}/${path}`, params)
      .then(successFunc)
      .catch(errorFunc);
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
          <Input
            size="md"
            style={styles.input}
            placeholder="Login"
            value={login}
            onChangeText={(text) => setLogin(text)}
            autoCapitalize='none'
            onSubmitEditing={() => senhaRef.focus()}
          />

          <View style={{ height: 20 }} />

          <Input
            size="md"
            style={styles.input}
            placeholder="Senha"
            value={senha}
            secureTextEntry
            onChangeText={(text) => setSenha(text)}
            ref={(ref) => senhaRef = ref}
            autoCapitalize='none'
            onSubmitEditing={handleLogin}
          />

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
