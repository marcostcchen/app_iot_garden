import React from 'react';
import { Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { IPlantacao, IUsuariosLoginResponse } from '../../models';
import { LoadingScreen } from '../../components';
import { Item, Label, Input, Form, Toast } from 'native-base';
import { sqlLiteThenFunctionQuery, sqlLiteMakeQuery } from '../../utils';
import { ResultSet } from 'react-native-sqlite-storage';
import { checkNotifications } from '../VisaoGeral/utils';

interface Props {
  navigation: any,
}

interface State {
  planta: IPlantacao,
  isLoading: Boolean,
  isSaving: Boolean,

  maxTemp: string,
  minTemp: string,
  maxUmid: string,
  minUmid: string,

  hasPlantConfig: Boolean,
}

export class ConfiguracaoPlantaScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      planta: null,
      isLoading: true,
      isSaving: false,

      maxTemp: "",
      minTemp: "",
      maxUmid: "",
      minUmid: "",

      hasPlantConfig: false,
    }
  }

  componentDidMount = async () => {
    const AsyncPlanta = await AsyncStorage.getItem("@selectedPlanta");
    if (AsyncPlanta) {
      const planta: IPlantacao = JSON.parse(AsyncPlanta);
      this.setState({ planta });

      const query = "SELECT * FROM ConfigTable WHERE planta = (?)"
      const hasRowFunction = (res: ResultSet) => {
        let plantaConfig = res.rows.item(0);
        this.setState({ hasPlantConfig: true, isLoading: false, maxTemp: plantaConfig.tempMax, minTemp: plantaConfig.tempMin, maxUmid: plantaConfig.umidMax, minUmid: plantaConfig.umidMin })
      }
      const noRowFunction = () => {
        this.setState({ hasPlantConfig: false, isLoading: false })
      }
      await sqlLiteMakeQuery(query, [planta.planta], noRowFunction, hasRowFunction)
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <LoadingScreen isLoading={this.state.isLoading} text={"Carregando informações da planta..."} />
      )
    }

    return (
      <>
        <LoadingScreen isLoading={this.state.isSaving} text={"Salvando..."} />
        <KeyboardAvoidingView behavior="padding" style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
          <ScrollView style={{ width: '100%' }}>
            <View style={{ width: '100%', alignItems: 'center' }}>
              <View style={{ width: '98%' }}>
                <Text style={{ fontSize: 40, color: 'green', marginBottom: 5 }}> {this.state.planta.planta} </Text>
              </View>
            </View>
            <Form>
              <Item stackedLabel >
                <Label>Temperatura Mínima °C</Label>
                <Input keyboardType="number-pad" placeholder={" - "} value={this.state.minTemp} onChangeText={(text) => this.setState({ minTemp: text })} />
              </Item>

              <Item stackedLabel >
                <Label>Temperatura Máxima °C</Label>
                <Input keyboardType="number-pad" placeholder={" - "} value={this.state.maxTemp} onChangeText={(text) => this.setState({ maxTemp: text })} />
              </Item>

              <Item stackedLabel >
                <Label>Umidade Mínima %</Label>
                <Input keyboardType="number-pad" placeholder={" - "} value={this.state.minUmid} onChangeText={(text) => this.setState({ minUmid: text })} />
              </Item>

              <Item stackedLabel >
                <Label>Umidade Máxima %</Label>
                <Input keyboardType="number-pad" placeholder={" - "} value={this.state.maxUmid} onChangeText={(text) => this.setState({ maxUmid: text })} />
              </Item>
            </Form>

            <View style={{ alignItems: 'center', width: '100%', marginBottom: 20, marginTop: 20 }}>
              <TouchableOpacity onPress={this.handleSaveButton} style={{ width: 120, height: 60, alignItems: "center", justifyContent: 'center', borderWidth: 0.5, backgroundColor: 'green', borderRadius: 15 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    )
  }

  handleSaveButton = async () => {
    this.setState({ isSaving: true });
    const thenFunction = async () => {
      const asyncString = await AsyncStorage.getItem("@login");
      if (asyncString !== null) {
        const UsuariosLoginResponse: IUsuariosLoginResponse = JSON.parse(asyncString);
        await checkNotifications(UsuariosLoginResponse.plantacoes);
      }
      Toast.show({ text: "Configuração salvo!", duration: 5000, type: "success", buttonText: "Fechar" });
      this.props.navigation.goBack();
    }

    if (this.state.hasPlantConfig) {
      const query = "UPDATE ConfigTable SET tempMax = (?), tempMin = (?), umidMax = (?), umidMin = (?) WHERE planta = (?)"
      await sqlLiteThenFunctionQuery(query, [this.state.maxTemp, this.state.minTemp, this.state.maxUmid, this.state.minUmid, this.state.planta.planta], thenFunction);
    } else {
      const query = "INSERT INTO ConfigTable (planta, tempMax, tempMin, umidMax, umidMin) VALUES (?,?,?,?,?)  "
      await sqlLiteThenFunctionQuery(query, [this.state.planta.planta, this.state.maxTemp, this.state.minTemp, this.state.maxUmid, this.state.minUmid], thenFunction);
    }

  }
}
