import React from 'react';
import { ListItem } from 'react-native-elements';

interface Props {
  navigation: any
}

interface State {

}

export class MinhasPlantasScreen extends React.Component<Props, State> {
  render() {
    return (
      <>
        <ListItem title={"Marcos Chen"} subtitle={"Cara legal"} bottomDivider chevron/>
        <ListItem title={"Matheus Sato"} subtitle={"Cara legal"} bottomDivider chevron/>
        <ListItem title={"Guilherme Ludescher"} subtitle={"Cara legal"} bottomDivider chevron/>
        <ListItem title={"Victor dias"} subtitle={"Cara legal"} bottomDivider chevron/>
      </>
    );
  }
}