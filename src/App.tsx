import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as View from './views';
import SplashScreen from 'react-native-splash-screen';
import { Root, Badge } from 'native-base';
import { sqlLiteThenFunctionQuery } from './utils';
import { TouchableOpacity, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

interface Props { }

interface State {
  badgeValue: number,
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      badgeValue: 0,
    }
  }

  componentDidMount = async () => {
    SplashScreen.hide();
    await this.createTablesSqlLite();
    await this.updateBadge();
  }

  render() {
    return (
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={View.LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Iot Garden" component={View.HomeScreen}
              options={({ navigation, route }) => ({ headerLeft: null, headerTintColor: 'green', headerRight: () => this.headerRight(navigation, route) })}
            />
            <Stack.Screen name="Detalhes Planta" component={View.DetalhesPlantaScreen} options={{ headerShown: true, headerTintColor: 'green' }} />
            <Stack.Screen name="Notificações" component={View.NotificacoesScreen} options={{ headerShown: true, headerTintColor: 'green' }} />
            <Stack.Screen name="Configuração da Planta" component={View.ConfiguracaoPlantaScreen} options={{ headerShown: true, headerTintColor: 'green' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    )
  }

  headerRight = (navigation, route) => (
    <TouchableOpacity style={{ height: 30, width: 30, marginRight: 20, marginTop: 5 }} onPress={() => navigation.navigate("Notificações")}>
      <Image style={{ height: '100%', width: '100%' }} source={require('./views/images/notificationIcon.png')} />
      <Badge style={{ position: "absolute", right: -5, top: -5, height: 20, width: 20 }} warning >
        <Text>{this.state.badgeValue}</Text>
      </Badge>
    </TouchableOpacity>
  )

  updateBadge = async () => {
    let badgeValue = await AsyncStorage.getItem("@badgeValue");
    if (badgeValue) {
      this.setState({ badgeValue: Number(badgeValue) });
    }
  }

  createTablesSqlLite = async () => {
    const createValidadoQuery = 'CREATE TABLE IF NOT EXISTS ConfigTable(planta VARCHAR(255), tempMax VARCHAR(255), tempMin VARCHAR(255), umidMax VARCHAR(255), umidMin VARCHAR(255))';
    await sqlLiteThenFunctionQuery(createValidadoQuery, [], null);

    // Clean notification table
    const deleteNotificationQuery = 'DELETE FROM NotificationTable';
    await sqlLiteThenFunctionQuery(deleteNotificationQuery, [], null);

    const createNotificationQuery = 'CREATE TABLE IF NOT EXISTS NotificationTable(planta VARCHAR(255), message VARCHAR(255))';
    await sqlLiteThenFunctionQuery(createNotificationQuery, [], null);
  }
}

console.disableYellowBox = true; // <-- This is to remove the deprecated component warning
