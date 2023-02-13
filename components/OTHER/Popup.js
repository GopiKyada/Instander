import { useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

export default function Popup({ navigation }) {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const icon = (
    <TouchableOpacity>
      <AntDesign name="bars" size={24} color="black" onPress={showMenu} />
    </TouchableOpacity>
  );

  return (
    <View
      style={{ height: "100%", alignItems: "center", justifyContent: "center" }}
    >
      <Menu visible={visible} anchor={icon} onRequestClose={hideMenu}>
        <MenuItem onPress={hideMenu}>latest</MenuItem>
        <MenuItem onPress={hideMenu}>oldest</MenuItem>
        <MenuItem onPress={hideMenu}>popular</MenuItem>
      </Menu>
    </View>
  );
}
