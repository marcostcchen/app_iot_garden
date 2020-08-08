import { Dimensions } from 'react-native';

export const screenWidth = 0.9 * Dimensions.get("window").width;

export const umidadeArData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    }
  ],
  legend: ["Umidade"]
};

export const temperaturaData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    }
  ],
  legend: ["Temperatura"],
};

export const umidadeSoloData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    }
  ],
  legend: ["Umidade Solo por planta"],
};


export const temperaturaChartConfig = {
  backgroundColor: "#ffa726",
  backgroundGradientFrom: "#ffa726",
  backgroundGradientTo: "red",
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "black"
  }
}

export const umidadeArChartConfig = {
  backgroundColor: "blue",
  backgroundGradientFrom: "blue",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "black"
  }
}

export const umidadeSoloChartConfig = {
  backgroundColor: "brown",
  backgroundGradientFrom: "brown",
  backgroundGradientTo: "gray",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "black"
  }
}