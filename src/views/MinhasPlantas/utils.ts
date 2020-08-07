import { IPlantacao } from "../../models";
import { isObjEmpty } from "../../utils";

export const getListaPlantas = (plantacoes: Map<String, IPlantacao>) => {
  if (!isObjEmpty(plantacoes)) {
    let plants: Array<IPlantacao> = Object.values(plantacoes);
    return plants;
  } else {
    return [];
  }
}

export const getImage = (index: number) => {
  return index == 0 ? require('../images/plant1.png') : index == 1 ? require('../images/plant2.png') : require('../images/plant3.png');
}