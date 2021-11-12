import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  imageContainer: {
    paddingTop: 30,
    backgroundColor: 'rgb(81, 149, 97)',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    borderRadius: 50,
    padding: 10,
    shadowColor: "#000",
    backgroundColor: "white",

    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 5,
  },
  infoContainer: {
    marginTop: -10,
    alignItems: "center",
    minHeight: 300,
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  overview: {
    width: "90%",
  },
  title: {
    height: 30,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  },
  threedotsContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  threedotsButton: {
    height: 30,
    width: 20,
    alignItems: 'flex-end'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#009dff',
  },
  button: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }
})
