import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";

const GraphModal = ({ visible, onClose, username }) => {
  const [myChartData, setMyChartData] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [chartValueList, setChartValueList] = useState([]);

  // Example data for the line chart
  // const chartData = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  //   datasets: [
  //     {
  //       data: [200, 450, 280, 800, 990, 430],
  //       color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Set the color of the line chart
  //     },
  //   ],
  // };
  // console.warn(myChartData);

  const getChartData = async () => {
    try {
      const response =
        await fetch(`https://api.unsplash.com/users/${username}/statistics/?quantity=4&client_id=3jA8JqRSjVb891zVslTQsYPqZEI8bZ1AbIQkkgyJxNw
      `);
      const mydata = await response.json();
      setMyChartData(mydata.downloads.historical.values);
      const updatedChartData = myChartData.map((item) => ({
        date: item.date,
        value: item.value,
      }));
      setChartValueList(updatedChartData);
      // console.warn(chartValueList);
      setIsLoaded(false);
      // console.warn(mydata.downloads.historical.values);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    getChartData();
  }, [getChartData, username]);

  return (
    <Modal
      //   animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose} />
      <View style={styles.container}>
        {/* Render the line chart */}
        {/* <LineChart
          data={chartData}
          width={300}
          height={200}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
        /> */}
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
