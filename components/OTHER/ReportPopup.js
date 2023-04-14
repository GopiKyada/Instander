import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { ThemeContext } from "./ThemeContext";

const ReportPopup = ({ visible, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const handleReport = (option) => {
    // Handle the selected report option here
    console.log(`Report option selected: ${option}`);
    onClose();
  };

  return (
    <Modal
      //   animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose} />
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <TouchableOpacity onPress={() => handleReport("Inappropriate")}>
          <Text style={[styles.option, { color: theme.textColor }]}>
            Report as Inappropriate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleReport("Spam")}>
          <Text style={[styles.option, { color: theme.textColor }]}>
            Report as Spam
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleReport("Other")}>
          <Text style={[styles.option, { color: theme.textColor }]}>
            Report as Other
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ReportPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: Colors.black,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  option: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    // color: Colors.white,
  },
  cancel: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: "center",
    color: "#256BFE",
    marginTop: 10,
  },
});
