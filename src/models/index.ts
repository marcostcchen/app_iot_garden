import { SensorType } from "../types/SensorType";

export interface IUsuariosLoginResponse {
  login: String,
  nome: String,
  plantações: Map<String, IPlantacao>
}

export interface IPlantacao {
  planta: String,
  sensores: Map<String, ISensor>
}

export interface ISensor {
  tipoSensor: SensorType,
  medicoes: any,
}