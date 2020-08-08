import { urlAPI } from "./constants";
import NetInfo from "@react-native-community/netinfo";
import { openDatabase } from 'react-native-sqlite-storage';
import { MockedFetch } from "./MockedFetch";
import { Toast } from "native-base";

export const NetInfoFetchPOST = async (url: string, jsonBody: any, noConnectionFunction: () => void, badRequestFuction: (erro?: any) => void, successFunction: (responseJson?: any) => void) => {
  try {
    NetInfo.fetch().then(state => {
      if (state.isConnected === false) {
        noConnectionFunction();
      } else {
        fetch(urlAPI + url, {
          method: 'POST',
          body: JSON.stringify(jsonBody),
        }).then((response) => {
          successFunction(response);
        }).catch((error) => {
          badRequestFuction(error)
        });
      }
    })
  } catch (error) {
    badRequestFuction(error)
  }
}

export const NetInfoFetchGET = async (url: string, noConnectionFunction: () => void, badRequestFuction: (erro?: any) => void, successFunction: (responseJson?: any) => void) => {
  try {
    NetInfo.fetch().then(state => {
      if (state.isConnected === false) {
        noConnectionFunction();
      } else {
        fetch(urlAPI + url, {
          method: 'GET',
        }).then((response) => {
          if (response.status == 404) {
            badRequestFuction(response);
          } else {
            response.json().then((responseJson) => {
              successFunction(responseJson);
            })
          }
        }).catch((error) => {
          badRequestFuction(error)
        });
      }
    })
  } catch (error) {
    badRequestFuction(error)
  }
}

export const getDataFetch = async (login: String, onSuccess: (responseJson) => void, onFail: () => void) => {
  // For api
  const noConnectionFunction = () => {
    Toast.show({ text: "Sem conexão de internet, tente novamente", duration: 4000, type: "danger" });
    onFail();
  }

  const badRequestFunction = (responseJson) => {
    Toast.show({ text: "Login não disponível", duration: 4000, type: "warning"});
    onFail();
  }

  const successFunction = (responseJson) => {
    onSuccess(responseJson);
  }

  await NetInfoFetchGET("/usuarios/" + login, noConnectionFunction, badRequestFunction, successFunction);
  // Local
  // this.setTimeout(() => {
  //   onSuccess(MockedFetch);
  // }, 1000)
}


export const sqlLiteMakeQuery = async (query: string, arrayParameters: Array<any>, noRowFunction: Function | null, hasRowFunction: Function | null) => {
  var db = await openDatabase({ name: 'UserDatabase.db', location: 'default' });

  await db.transaction((tx) => {
    tx.executeSql(
      query,
      arrayParameters,
      (tx, res) => {
        if (res.rows.length == 0) {
          if (noRowFunction)
            noRowFunction()
        }
        else {
          if (hasRowFunction)
            hasRowFunction(res)
        }
      })
  })
}

export const sqlLiteThenFunctionQuery = async (query: string, arrayParameters: Array<any>, thenFuction: Function | null) => {
  var db = await openDatabase({ name: 'UserDatabase.db', location: 'default' });

  await db.transaction((tx) => {
    tx.executeSql(
      query,
      arrayParameters,
      (tx, res) => {
        if (thenFuction != null) {
          thenFuction(res)
        }
      })
  })
}

export const isObjEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}