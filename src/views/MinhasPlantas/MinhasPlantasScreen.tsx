import React from 'react';
import { ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { IUsuariosLoginResponse, IPlantacao } from '../../models';
import * as utils from './utils';
import { styles } from './styles';

interface Props {
  navigation: any
}

interface State {
  listaPlantas: Array<IPlantacao>
  isLoading: Boolean
}

export class MinhasPlantasScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      listaPlantas: [],
      isLoading: true,
    }
  }

  componentDidMount = async () => {
    const asyncString = await AsyncStorage.getItem("@login");
    if (asyncString !== null) {
      const UsuariosLoginResponse: IUsuariosLoginResponse = JSON.parse(asyncString);
      const listaPlantas = utils.getListaPlantas(UsuariosLoginResponse.plantacoes);
      this.setState({ listaPlantas: listaPlantas, isLoading: false })
    }
  }

  render() {
    return (
      <>
        {this.state.listaPlantas.map((planta, index) => {
          let image = utils.getImage(index);
          let quantidadeSensores = Object.values(planta.sensores).length
          return (
            <ListItem
              key={index}
              title={planta.planta}
              subtitle={"N° Sensores: " + quantidadeSensores}
              leftAvatar={{ source: image }}
              onPress={() => this.onListItemPress(planta)}
              containerStyle={styles.container}
              bottomDivider
              chevron />
          )
        })}
      </>
    );
  }

  onListItemPress = async (planta: IPlantacao) => {
    await AsyncStorage.setItem("@selectedPlanta", JSON.stringify(planta));
    this.props.navigation.navigate("Detalhes Planta");
  }
}