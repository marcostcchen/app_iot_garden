import { IPlantacao, ISensor, IMedicao } from "../../models"
import { SensorType } from "../../types/SensorType";
import { isObjEmpty, sqlLiteMakeQuery, sqlLiteThenFunctionQuery } from "../../utils";
import { ResultSet } from "react-native-sqlite-storage";
import AsyncStorage from "@react-native-community/async-storage";

export const getData = (plantacoes: Map<String, IPlantacao>, tipoSensor: SensorType) => {
  const medicoesData: Array<number> = [];

  if (!isObjEmpty(plantacoes)) {
    const plantas: Array<IPlantacao> = Object.values(plantacoes);
    plantas.map((planta) => {
      if (!isObjEmpty(planta.sensores)) {
        const sensoresDaPlanta: Array<ISensor> = Object.values(planta.sensores);
        const sensor = sensoresDaPlanta.find((planta) => planta.tipoSensor == tipoSensor || planta.tipoSensor == "umid/temp")
        // Tem sensor de umidade
        if (sensor) {
          if (!isObjEmpty(sensor.medicoes)) {
            const medicoes: Array<IMedicao> = Object.values(sensor.medicoes);
            let medicaoMedia = 0.00;
            medicoes.map((medicao) => {
              if (tipoSensor == "umid") {
                medicaoMedia = medicaoMedia + parseFloat(medicao.umid);
              } else {
                medicaoMedia = medicaoMedia + parseFloat(medicao.temp);
              }
            })
            medicaoMedia = (medicaoMedia / medicoes.length);
            medicoesData.push(medicaoMedia);
          }
        }
      }
    })
  }
  return medicoesData;

}

export const getLabels = (plantacoes: Map<String, IPlantacao>, tipoSensor: SensorType) => {
  const labels: Array<String> = [];
  if (!isObjEmpty(plantacoes)) {
    const plantas: Array<IPlantacao> = Object.values(plantacoes);
    plantas.map((planta) => {
      if (!isObjEmpty(planta.sensores)) {
        const sensoresDaPlanta: Array<ISensor> = Object.values(planta.sensores);

        const sensorUmidade = sensoresDaPlanta.find((planta) => planta.tipoSensor == tipoSensor || planta.tipoSensor == "umid/temp")
        // Tem sensor de umidade
        if (sensorUmidade) {
          labels.push(planta.planta);
        }
      }
    })
    return labels;
  }
}

export const checkNotifications = async (plantacoes: Map<String, IPlantacao>) => {
  // Pega o ultimo registro de cada planta e verifica
  if (!isObjEmpty(plantacoes)) {
    const plantas: Array<IPlantacao> = Object.values(plantacoes);
    plantas.map(async (planta) => {
      let tempMax = 0, tempMin = 0, umidMax = 0, umidMin = 0;

      const hasRowFunction = (res: ResultSet) => {
        let plantaConfig = res.rows.item(0);
        tempMax = Number(plantaConfig.tempMax);
        tempMin = Number(plantaConfig.tempMin);
        umidMax = Number(plantaConfig.umidMax);
        umidMin = Number(plantaConfig.umidMin);

        if (!isObjEmpty(planta.sensores)) {
          const sensores: Array<ISensor> = Object.values(planta.sensores);

          sensores.map((sensor) => {
            if (!isObjEmpty(sensor.medicoes)) {
              if (sensor.tipoSensor == "temp" || sensor.tipoSensor == "umid/temp") {
                const entries = Object.entries(sensor.medicoes);
                entries.map(async (medicao, index) => {
                  if (index == entries.length - 1) {
                    let ultimaMedicaoTemp = Number(medicao[1].temp);
                    if (tempMax != 0 && ultimaMedicaoTemp > tempMax) {
                      await insertToNotificationTable(planta.planta, `A planta ${planta.planta} está com temperatura ${medicao[1].temp} e está acima da temperatura máxima!`)
                    } else if (tempMin != 0 && ultimaMedicaoTemp < tempMin) {
                      await insertToNotificationTable(planta.planta, `A planta ${planta.planta} está com temperatura ${medicao[1].temp} abaixo da temperatura mínima!`)
                    }
                  }
                })
              }

              if (sensor.tipoSensor == "umid" || sensor.tipoSensor == "umid/temp") {
                if (!isObjEmpty(sensor.medicoes)) {
                  const entries = Object.entries(sensor.medicoes);
                  entries.map(async (medicao, index) => {
                    if (index == entries.length - 1) {
                      let ultimaMedicaoUmid = Number(medicao[1].umid);
                      if (umidMax != 0 && ultimaMedicaoUmid > umidMax) {
                        await insertToNotificationTable(planta.planta, `A planta ${planta.planta} está com umidade ${medicao[1].umid} e está acima da temperatura máxima!`)
                      } else if (umidMin != 0 && ultimaMedicaoUmid < umidMin) {
                        await insertToNotificationTable(planta.planta, `A planta ${planta.planta} está com umidade ${medicao[1].umid} e está abaixo da temperatura mínima!`)
                      }
                    }
                  })
                }
              }
            }
          })
        }
      }

      await sqlLiteMakeQuery("SELECT * FROM ConfigTable WHERE planta = (?)", [planta.planta], null, hasRowFunction);
      updateBadge();
    })
  }
}

const insertToNotificationTable = async (nome: string, mensagem: string) => {
  const query = "INSERT INTO NotificationTable (planta, message) VALUES (?,?)";
  const array = [nome, mensagem];
  await sqlLiteThenFunctionQuery(query, array, null);
}

export const updateBadge = async () => {
  const query = "SELECT * FROM NotificationTable";
  const array = [];

  const thenFuction = async (res: ResultSet) => {
    await AsyncStorage.setItem("@badgeValue", res.rows.length.toString())
  }

  await sqlLiteThenFunctionQuery(query, array, thenFuction);
}