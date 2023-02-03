import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";

export default function Popup() {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  return (
    <View
      style={{ height: "100%", alignItems: "center", justifyContent: "center" }}
    >
      <Menu
        visible={visible}
        anchor={
          <TouchableOpacity>
            <AntDesign name="bars" size={24} color="black" onPress={showMenu} />
          </TouchableOpacity>
        }
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={hideMenu}>latest</MenuItem>
        <MenuItem onPress={hideMenu}>oldest</MenuItem>
        <MenuItem onPress={hideMenu}>popular</MenuItem>
      </Menu>
    </View>
  );
}
