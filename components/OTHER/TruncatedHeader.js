import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { ThemeContext } from "./ThemeContext";

const TruncatedHeader = ({ title }) => {
  const { theme } = useContext(ThemeContext);
  const truncatedTitle =
    title.length > 18 ? `${title.substring(0, 18)}...` : title;

  return (
    <Text style={[styles.headerTitleStyle, { color: theme.textColor }]}>
      {truncatedTitle}
    </Text>
  );
};

export default TruncatedHeader;

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 25,
    // color: Colors.white,
  },
});
