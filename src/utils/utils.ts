export const apiUrl = "https://ashrmbvd5d.execute-api.us-east-1.amazonaws.com/dev";

export const getImageSource = (image: string) => {
  let imageSource = require("../images/plant1.png")
  switch (image) {
    case "plant1.png":
      imageSource = require("../images/plant1.png")
      break;
    case "plant2.png":
      imageSource = require("../images/plant2.png")
      break;
    case "plant3.png":
      imageSource = require("../images/plant3.png")
      break;
  }
return imageSource;
}