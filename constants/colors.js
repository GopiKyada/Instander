export const Colors = {
  blue: "white",
  black: "#f6f6f8",
  white: "black",
};

export const getColors = (isDarkMode) => {
  if (isDarkMode) {
    return {
      backgroundColor: "#1E1E1E", //black
      textColor: "white",
      cardColor: "#256BFE", //blue
      tabColor: "black",
      activeTab: "#256BFE", //blue
      specialTxt: "#0099FF", //blue tick color
      // It is Dark Mode
    };
  } else {
    return {
      backgroundColor: "#f6f6f8", //grey
      textColor: "black",
      cardColor: "white",
      tabColor: "white",
      activeTab: "pink",
      specialTxt: "#0099FF", //blue tick color
      //It is Light Mode
    };
  }
};
