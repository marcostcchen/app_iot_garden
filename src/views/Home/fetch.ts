import { Pacote, Planta } from "../../models";
import { apiUrl } from "../../utils";

export interface getBundlesRes {

}

export const getBundles: () => Promise<Array<Pacote> | null> = () => {
  return new Promise((res, rej) => {
    fetch(`${apiUrl}/plants`)
      .then(function (response) { return response.text() })
      .then(textRes => {
        res(JSON.parse(textRes))
      })
      .catch((res) => {
        res(null)
      });
  })
}