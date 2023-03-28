import React from "react";
import { Text, StyleSheet } from "react-native";

const TruncatedHeader = ({ title }) => {
  const truncatedTitle =
    title.length > 18 ? `${title.substring(0, 18)}...` : title;

  return <Text style={styles.headerTitleStyle}>{truncatedTitle}</Text>;
};

export default TruncatedHeader;

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
  },
});
