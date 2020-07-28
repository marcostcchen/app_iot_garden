import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  chart: {
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  bemVindoContainer: {
    paddingLeft: 20,
    marginBottom: 15,
    justifyContent: "center",
    height: 90,
    width: '90%',
    borderColor: 'black',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  bemVindoText: {
    fontSize: 26,
    color: "green",

  },
  bemVindoNameText: {
    fontSize: 16,
    color: "gray"
  }
});