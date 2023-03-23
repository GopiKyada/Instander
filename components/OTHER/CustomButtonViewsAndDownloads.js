import React, { useState } from "react";
import { TouchableHighlight, Text, View } from "react-native";

const CustomButtonViewsAndDownloads = () => {
  const [selectedButton, setSelectedButton] = useState("views");

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableHighlight
        style={{
          backgroundColor: selectedButton === "views" ? "blue" : "gray",
          padding: 10,
          borderRadius: 5,
          marginRight: 10,
        }}
        onPress={() => setSelectedButton("views")}
        underlayColor={selectedButton === "views" ? "blue" : "gray"}
      >
        <Text style={{ color: "white" }}>Views</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={{
          backgroundColor: selectedButton === "downloads" ? "blue" : "gray",
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() => setSelectedButton("downloads")}
        underlayColor={selectedButton === "downloads" ? "blue" : "gray"}
      >
        <Text style={{ color: "white" }}>Downloads</Text>
      </TouchableHighlight>
    </View>
  );
};

export default CustomButtonViewsAndDownloads;
