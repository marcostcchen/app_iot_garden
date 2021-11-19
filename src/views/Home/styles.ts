import { StyleSheet } from 'react-native';
import { alignItems } from 'styled-system';

export const styles = StyleSheet.create({
  menuContainer: {
    marginTop: 15
  },
  title: {
    fontSize: 30, paddingLeft: 15, fontWeight: 'bold'
  },
  scrollView: {
    backgroundColor: 'white'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  card: {
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'left',
    margin: 10,
    borderRadius: 10,
    height: 300,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
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
  plus: {
    height: 50, width: 50, color: 'gray', fontSize: 40, lineHeight: 48, alignItems: 'center', textAlignVertical: 'center', textAlign: 'center'
  },
  bePremiumContainer: {
    position: 'absolute',
    alignSelf: 'center',
    marginVertical: 50,
    zIndex: 20,
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  bePremiumText: {
    fontSize: 18,
    color: 'black',
    padding: 20,
    textAlign: 'center',
    opacity: 1,

  },
  bePremiumButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'brown',
    height: 70,
    alignSelf: 'center',
    marginBottom: 20,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bePremiumOpacityContainer: {
    position: 'absolute', zIndex: 20, backgroundColor: 'white', opacity: 0.7, height: '100%', width: '100%'
  }
});