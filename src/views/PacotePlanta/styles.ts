import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: 70,
    height: 50,
    padding: 7,
    paddingRight: 9,
    backgroundColor: 'green',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'gray',
    textAlign: 'justify',
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
  myPlantOptionContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  myPlantText: {
    color: 'green',
    fontSize: 15,
    textAlign: 'center'
  }
})
