import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

const ReportPopup = ({ visible, onClose }) => {
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
      <View style={styles.container}>
        <TouchableOpacity onPress={() => handleReport("Inappropriate")}>
          <Text style={styles.option}>Report as Inappropriate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleReport("Spam")}>
          <Text style={styles.option}>Report as Spam</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleReport("Other")}>
          <Text style={styles.option}>Report as Other</Text>
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
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  option: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cancel: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: "center",
    color: "blue",
    marginTop: 10,
  },
});
