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
        const sensor = sensoresDaPlanta.find((planta) => planta.tipoSensor == tipoSensor)
        // Tem sensor de umidade
        if (sensor) {
          if (!isObjEmpty(sensor.medicoes)) {
            const medicoes: Array<IMedicao> = Object.values(sensor.medicoes);
            let medicaoMedia = 0.00;
            medicoes.map((medicao) => {
              if (tipoSensor == "umid") {
                medicaoMedia = medicaoMedia + parseFloat(medicao.umid);
              } else if (tipoSensor == "temp") {
                medicaoMedia = medicaoMedia + parseFloat(medicao.temp);
              } else {
                medicaoMedia = medicaoMedia + parseFloat(medicao.umidsolo)
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

        const sensor = sensoresDaPlanta.find((planta) => planta.tipoSensor == tipoSensor)
        // Tem sensor de umidade
        if (sensor) {
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
      await cleanPlantaData(planta.planta);

      let tempMax = 0, tempMin = 0, umidMax = 0, umidMin = 0, umidSoloMax = 0, umidSoloMin = 0;

      const hasRowFunction = async (res: ResultSet) => {
        let plantaConfig = res.rows.item(0);
        tempMax = Number(plantaConfig.tempMax);
        tempMin = Number(plantaConfig.tempMin);
        umidMax = Number(plantaConfig.umidMax);
        umidMin = Number(plantaConfig.umidMin);
        umidSoloMax = Number(plantaConfig.umidSoloMax);
        umidSoloMin = Number(plantaConfig.umidSoloMin);

        if (!isObjEmpty(planta.sensores)) {
          const sensores: Array<ISensor> = Object.values(planta.sensores);

          sensores.map((sensor) => {
            if (!isObjEmpty(sensor.medicoes)) {
              if (sensor.tipoSensor == "temp") {
                const entries = Object.entries(sensor.medicoes);
                entries.map(async (medicao, index) => {
                  if (index == entries.length - 1) {
                    let ultimaMedicaoTemp = Number(medicao[1].temp);
                    if (tempMax != 0 && ultimaMedicaoTemp > tempMax) {
                      await insertToNotificationTable(planta.planta, `Temperatura: ${medicao[1].temp}. Está acima da temperatura máxima!`)
                    } else if (tempMin != 0 && ultimaMedicaoTemp < tempMin) {
                      await insertToNotificationTable(planta.planta, `Temperatura: ${medicao[1].temp}. Está abaixo da temperatura mínima!`)
                    }
                  }
                })
              }

              if (sensor.tipoSensor == "umid") {
                if (!isObjEmpty(sensor.medicoes)) {
                  const entries = Object.entries(sensor.medicoes);
                  entries.map(async (medicao, index) => {
                    if (index == entries.length - 1) {
                      let ultimaMedicaoUmid = Number(medicao[1].umid);
                      if (umidMax != 0 && ultimaMedicaoUmid > umidMax) {
                        await insertToNotificationTable(planta.planta, `Umidade do Ar: ${medicao[1].umid}. Acima da temperatura máxima!`)
                      } else if (umidMin != 0 && ultimaMedicaoUmid < umidMin) {
                        await insertToNotificationTable(planta.planta, `Umidade do Ar: ${medicao[1].umid}. Abaixo da temperatura mínima!`)
                      }
                    }
                  })
                }
              }

              if (sensor.tipoSensor == "umidsolo") {
                if (!isObjEmpty(sensor.medicoes)) {
                  const entries = Object.entries(sensor.medicoes);
                  entries.map(async (medicao, index) => {
                    if (index == entries.length - 1) {
                      let ultimaMedicaoUmidsolo = Number(medicao[1].umidsolo);
                      if (umidMax != 0 && ultimaMedicaoUmidsolo > umidMax) {
                        await insertToNotificationTable(planta.planta, `Umidade do solo: ${medicao[1].umidsolo}. Está acima da temperatura máxima!`)
                      } else if (umidMin != 0 && ultimaMedicaoUmidsolo < umidMin) {
                        await insertToNotificationTable(planta.planta, `Umidade do solo: ${medicao[1].umidsolo}. Está abaixo da temperatura mínima!`)
                      }
                    }
                  })
                }
              }
            }
          })
        }
        await updateBadge();
      }

      await sqlLiteMakeQuery("SELECT * FROM ConfigTable WHERE planta = (?)", [planta.planta], null, hasRowFunction);
    })
  }
}

const cleanPlantaData = async (nome: string) => {
  const query = "DELETE FROM NotificationTable WHERE planta = (?) ";
  const array = [nome];
  await sqlLiteThenFunctionQuery(query, array, null);
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