import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";

const GraphModal = ({ visible, onClose, username }) => {
  const [chartValueList, setChartValueList] = useState([]);

  const getChartData = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/users/${username}/statistics/?quantity=4&client_id=3jA8JqRSjVb891zVslTQsYPqZEI8bZ1AbIQkkgyJxNw`
      );
      const mydata = await response.json();
      const updatedChartData = mydata.downloads.historical.values.map(
        (item) => ({
          date: item.date,
          value: item.value,
        })
      );
      setChartValueList(updatedChartData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} onPress={onClose} />
      <View style={styles.container}>
        <VictoryChart
          width={300}
          height={200}
          theme={VictoryTheme.material}
          style={{ axis: { ticks: { display: "none" } } }}
        >
          <VictoryLine data={chartValueList} x="date" y="value" />
        </VictoryChart>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.close}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default GraphModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    position: "absolute",
    top: "45%",
    left: "45%",
    transform: [{ translateX: -150 }, { translateY: -100 }],
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    // height: 200,
    // width: 300,
  },
  close: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: "center",
    color: "blue",
    marginTop: 10,
  },
});
