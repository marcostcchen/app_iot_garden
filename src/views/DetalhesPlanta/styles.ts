import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  chart: {
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  bottomInfo: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft: 15,
    marginBottom: 15,
    justifyContent: "center",
    height: 100,
    width: '90%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  ultimaMedicao: {
    fontSize: 24,
  },


  topInfo: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft: 15,
    justifyContent: "center",
    height: 50,
    width: '90%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft: 20,
    marginBottom: 15,
    justifyContent: "center",
    height: 100,
    width: '90%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  topInfoText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bemVindoText: {
    fontSize: 22,
    color: "gray",
  },
  bemVindoNameText: {
    fontSize: 16,
    paddingLeft: 1,
    color: "gray"
  }
});