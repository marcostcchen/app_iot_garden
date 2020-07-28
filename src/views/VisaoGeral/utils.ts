import { IPlantacao, ISensor, IMedicao } from "../../models"
import { SensorType } from "../../types/SensorType";

export const getData = (plantacoes: Map<String, IPlantacao>, tipoSensor: SensorType) => {
  const medicoesData: Array<Number> = [];

  const plantas: Array<IPlantacao> = Object.values(plantacoes);
  plantas.map((planta) => {

    const sensoresDaPlanta: Array<ISensor> = Object.values(planta.sensores);
    const sensor = sensoresDaPlanta.find((planta) => planta.tipoSensor == tipoSensor || planta.tipoSensor == "umid/temp")
    // Tem sensor de umidade
    if (sensor) {
      const medicoes: Array<IMedicao> = Object.values(sensor.medicoes);

      let medicaoMedia = 0.00;
      medicoes.map((medicao) => {
        if(tipoSensor == "umid") {
          medicaoMedia = medicaoMedia + parseFloat(medicao.umid);
        } else {
          medicaoMedia = medicaoMedia + parseFloat(medicao.temp);
        }
      })
      medicaoMedia = (medicaoMedia / medicoes.length);
      medicoesData.push(medicaoMedia);
    }
  })

  return medicoesData;

}

export const getLabels = (plantacoes: Map<String, IPlantacao>, tipoSensor: SensorType) => {
  const labels: Array<String> = [];

  const plantas: Array<IPlantacao> = Object.values(plantacoes);
  plantas.map((planta) => {
    const sensoresDaPlanta: Array<ISensor> = Object.values(planta.sensores);

    const sensorUmidade = sensoresDaPlanta.find((planta) => planta.tipoSensor == tipoSensor || planta.tipoSensor == "umid/temp")
    // Tem sensor de umidade
    if (sensorUmidade) {
      labels.push(planta.planta);
    }
  })
  return labels;
}
