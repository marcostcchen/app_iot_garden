import Snackbar from "react-native-snackbar"
import { greenSucess, redDanger, yellowWarning } from "./colors"

interface SnackbarConfig {
  text: string,
  duration: number,
  backgroundColor: string,
  action: {
    text: string,
    textColor: string,
    onPress: () => void,
  }
}

export const SnackbarDanger = (text: string, duration: number = 5000): SnackbarConfig => {
  return {
    text,
    duration,
    backgroundColor: redDanger,
    action: {
      text: 'Fechar',
      textColor: 'white',
      onPress: () => Snackbar.dismiss()
    },
  } 
}

export const SnackbarWarning = (text: string, duration: number = 5000): SnackbarConfig => {
  return {
    text,
    duration,
    backgroundColor: yellowWarning,
    action: {
      text: 'Fechar',
      textColor: 'white',
      onPress: () => Snackbar.dismiss()
    },
  }
}

export const SnackbarSuccess = (text: string, duration: number = 5000): SnackbarConfig => {
  return {
    text,
    duration,
    backgroundColor: greenSucess,
    action: {
      text: 'Fechar',
      textColor: 'white',
      onPress: () => Snackbar.dismiss()
    },
  }
}