import React from 'react';
import { ScrollView } from 'react-native';
import { sqlLiteThenFunctionQuery } from '../../utils';
import { ResultSet } from 'react-native-sqlite-storage';
import { INotification } from '../../models';
import { LoadingScreen } from '../../components';
import { ListItem } from 'react-native-elements';

interface Props {
  navigation: any,
}

interface State {
  initialLoading: Boolean,
  notifications: Array<INotification>,
}


export class NotificacoesScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      initialLoading: true,
      notifications: [],
    }
  }

  componentDidMount = async () => {
    this.getNotifications();
  }

  render() {
    if (this.state.initialLoading) {
      return (
        <LoadingScreen isLoading={this.state.initialLoading} text={"Carregando notificações..."} />
      )
    }

    return (
      <ScrollView>
        {this.state.notifications.map((notification, index) => {
          return (
            <ListItem
              key={index}
              title={notification.nome}
              subtitle={notification.message}
              bottomDivider />
          )
        })}
      </ScrollView>
    );
  }

  getNotifications = async () => {
    const thenFuction = (res: ResultSet) => {
      let notificationsArray: Array<INotification> = [];
      for (let i = 0; i < res.rows.length; i++) {
        let notification: INotification = {
          nome: res.rows.item(i).planta,
          message: res.rows.item(i).message,
        }
        notificationsArray.push(notification);
      }
      this.setState({ notifications: notificationsArray, initialLoading: false })
    }
    await sqlLiteThenFunctionQuery("SELECT * FROM NotificationTable", [], thenFuction);
  }
}
