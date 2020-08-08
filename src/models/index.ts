import { SensorType } from "../types/SensorType";

export interface IUsuariosLoginResponse {
  login: string,
  nome: string,
  plantacoes: Map<string, IPlantacao>
}

export interface IPlantacao {
  planta: string,
  sensores: Map<string, ISensor>
}

export interface ISensor {
  tipoSensor: SensorType,
  medicoes: Map<string, IMedicao>,
}

export interface IMedicao {
    umid: string,
    temp: string,
    umidsolo: string,
}

export interface INotification {
  nome: string,
  message: string,
}