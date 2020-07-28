export const getImage = (index: Number) => {
  return index == 0 ? require('../images/plant1.png') : index == 1 ? require('../images/plant2.png') : require('../images/plant3.png');
}