import { UsuarioPlanta } from "../models";

export const apiUrl = "https://ashrmbvd5d.execute-api.us-east-1.amazonaws.com/dev";

export const getImageSource = (image: string) => {
  let imageSource = require("../images/plant1.png")
  switch (image) {
    case "plant1.png":
      imageSource = require("../images/plant1.png")
      break;
    case "plant2.png":
      imageSource = require("../images/plant2.png")
      break;
    case "plant3.png":
      imageSource = require("../images/plant3.png")
      break;
  }
  return imageSource;
}

export const verifyIfPlantsHasWarning = (userPlants: Array<UsuarioPlanta>) => {
  let warning = null;
  userPlants.forEach(plant => {
    if (warning != null) return;
    if (!!!plant.medicoes) return;

    const { umidade_ar_ideal, luminosidade_ideal, temperatura_maxima, temperatura_minima, umidade_solo_ideal } = plant.planta;
    const lastMeasure = plant.medicoes[plant.medicoes.length - 1]

    if (!!!lastMeasure) return;

    const margem = 5

    if (parseFloat(lastMeasure.temperatura) > parseFloat(temperatura_maxima)) warning = `${plant.nome} com temperatura muito alta!${"\n"}Temperatura Máxima configurada ${temperatura_maxima}`;
    if (parseFloat(lastMeasure.temperatura) < parseFloat(temperatura_minima)) warning = `${plant.nome} com temperatura muito baixa!${"\n"}Temperatura Mínima configurada ${temperatura_minima}`;
    if (parseFloat(lastMeasure.luminosidade) > parseFloat(luminosidade_ideal) + margem) warning = `${plant.nome} com luminosidade muito alta!${"\n"}Luminosidade configurada é de ${luminosidade_ideal}%`;
    if (parseFloat(lastMeasure.luminosidade) < parseFloat(luminosidade_ideal) - margem) warning = `${plant.nome} com luminosidade muito baixa!${"\n"}Luminosidade configurada é de ${luminosidade_ideal}%`;
    if (parseFloat(lastMeasure.umidade_ar) > parseFloat(umidade_ar_ideal) + margem) warning = `Planta ${plant.nome} está com umidade do ar muito alta!${"\n"}Umidade configurada é de ${umidade_ar_ideal}%`;
    if (parseFloat(lastMeasure.umidade_ar) < parseFloat(umidade_ar_ideal) - margem) warning = `Planta ${plant.nome} está com umidade do ar muito baixa!${"\n"}Umidade configurada é de ${umidade_ar_ideal}%`;
    if (parseFloat(lastMeasure.umidade_solo) > parseFloat(umidade_solo_ideal) + margem) warning = `Planta ${plant.nome} está com umidade do solo muito alta!${"\n"}Umidade configurada é de ${umidade_solo_ideal}%`;
    if (parseFloat(lastMeasure.umidade_solo) < parseFloat(umidade_solo_ideal) - margem) warning = `Planta ${plant.nome} está com alerta do solo muito baixa!${"\n"}Umidade configurada é de ${umidade_solo_ideal}%`;
  })
  return warning;
}

export const getInitialMeasureIndex = (arrayLength: number) => {
  switch (true) {
    case arrayLength > 4:
      return arrayLength - 4;
    default:
      return 0;
  }
}