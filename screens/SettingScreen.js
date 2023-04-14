import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import DarkLightButton from "../components/OTHER/DarkLightButton";
import { ThemeContext } from "../components/OTHER/ThemeContext";

const SettingScreen = () => {
  const { theme } = useContext(ThemeContext);
  const navigations = useNavigation();
  useEffect(() => {
    navigations.setOptions({
      headerStyle: {
        backgroundColor: theme.backgroundColor, // set your desired color here
      },
      headerTitleStyle: {
        color: theme.textColor, // set your desired color here
      },
      headerTintColor: theme.textColor,
    });
  }, [theme]);
  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={[styles.specialTxt, { color: theme.specialTxt }]}>User</Text>
      <View style={[styles.card, { backgroundColor: theme.cardColor }]}>
        <Text style={[styles.headingTxt, { color: theme.textColor }]}>
          Name
        </Text>
        <Text style={[styles.contentTxt, { color: theme.textColor }]}>
          Gopi Kyada
        </Text>
      </View>
      <View style={[styles.card, { backgroundColor: theme.cardColor }]}>
        <Text style={[styles.headingTxt, { color: theme.textColor }]}>
          Joined On
        </Text>
        <Text style={[styles.contentTxt, { color: theme.textColor }]}>
          14-04-2023
        </Text>
      </View>
      <Text style={[styles.specialTxt, { color: theme.specialTxt }]}>
        Theme Switch
      </Text>
      <DarkLightButton />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    // marginTop: 10,
    flex: 1,
  },
  specialTxt: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    // flexDirection: "row",
    // borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  headingTxt: {
    fontSize: 20,
    paddingBottom: 5,
    fontWeight: "bold",
  },
  contentTxt: {
    fontSize: 18,
  },
});
