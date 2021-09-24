import { StyleSheet } from "react-native";
import { grayLight } from "../../utils";

export const styles = StyleSheet.create({
  mainContainer: {
    height: '100%'
  },
  blankPaddingHeader: {
    height: '25%',
    justifyContent: 'center',
    paddingLeft: 15
  },
  logoContainer: {
    height: '30%',
    width: '100%',
    alignItems: 'center',
  },
  loginContainer: {
    height: '60%',
    alignItems: 'center'
  },
  inputsContainer: {
    height: '60%',
    width: '80%',
  },
  title: {
    fontSize: 18
  },
  input: {
    height: 'auto',
    borderColor: grayLight,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#964B00',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  entrarText: {
    color: 'white',
    lineHeight: 30,
    fontSize: 24
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-end'
  }
})