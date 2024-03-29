import { Medicao, Planta } from ".";

export interface UsuarioPlanta {
  id: string,
  idPlanta: number,
  id_planta: string,
  nome: string,
  temperatura_maxima: string,
  temperatura_minima: string,
  temperatura_ideal: string,
  umidade_solo_ideal: string,
  umidade_ar_ideal: string,
  luminosidade_ideal: string,
  regas: number,
  usuario: string,
  planta: Planta,
  medicoes?: Array<Medicao>,
}