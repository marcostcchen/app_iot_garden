import React from 'react';
// import { ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { IUsuariosLoginResponse, IPlantacao } from '../../models';
import * as utils from './utils';
import { styles } from './styles';
import { isObjEmpty } from '../../utils';
import { ScrollView, RefreshControl } from 'react-native';

interface Props {
  navigation: any
}

interface State {
  listaPlantas: Array<IPlantacao>
  isLoading: boolean;
  refresh: boolean
}

export class MinhasPlantasScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      listaPlantas: [],
      isLoading: true,
      refresh: false,
    }
  }

  componentDidMount = async () => {
    await this.getListaPlantas();
  }

  render() {
    return (
      <>
        <ScrollView refreshControl={<RefreshControl refreshing={this.state.refresh} onRefresh={this.getListaPlantas} />}>
          {this.state.listaPlantas.map((planta, index) => {
            let image = utils.getImage(index);
            if (!isObjEmpty(planta.sensores)) {
              let quantidadeSensores = Object.values(planta.sensores).length
              return (
                <>
                </>
                // <ListItem
                //   key={index}
                //   title={planta.planta}
                //   subtitle={"N° Sensores: " + quantidadeSensores}
                //   leftAvatar={{ source: image }}
                //   onPress={() => this.onListItemPress(planta, index)}
                //   containerStyle={styles.container}
                //   bottomDivider
                //   chevron />
              )
            }
          })}
        </ScrollView>
      </>
    );
  }

  getListaPlantas = async () => {
    const asyncString = await AsyncStorage.getItem("@login");
    if (asyncString !== null) {
      const UsuariosLoginResponse: IUsuariosLoginResponse = JSON.parse(asyncString);
      const listaPlantas = utils.getListaPlantas(UsuariosLoginResponse.plantacoes);
      this.setState({ listaPlantas: listaPlantas, isLoading: false })
    }
  }

  onListItemPress = async (planta: IPlantacao, index: number) => {
    await AsyncStorage.setItem("@selectedPlantaImg", index.toString());
    await AsyncStorage.setItem("@selectedPlanta", JSON.stringify(planta));
    this.props.navigation.navigate("Detalhes Planta");
  }
}