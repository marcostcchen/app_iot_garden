import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    height: 100,
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },
  statusBarSpace: {
    height: 30,
  },
  menuIconsContainer: {
    height: 70, flexDirection: 'row', alignItems: 'center'
  },
  hambugerIcon: {
    width: '12%', alignItems: 'flex-end'
  },
  logoIcon: {
    alignItems: 'center', width: '76%'
  },
  notifIcon: {
    width: '12%', alignItems: 'flex-start'
  },
  button: {
    alignItems: 'center', justifyContent: 'center',
  }
})
