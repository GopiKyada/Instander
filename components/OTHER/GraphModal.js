import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryBar,
  VictoryLabel,
} from "victory-native";
import { Colors } from "../../constants/colors";

const GraphModal = ({ visible, onClose, username }) => {
  const [chartValueList, setChartValueList] = useState([]);
  const [viewBtnStyle, setViewBtnStyle] = useState(styles.viewActiveTab);
  const [downloadsBtnStyle, setDownloadsBtnStyle] = useState(
    styles.downloadsTab
  );
  const [text, setTxt] = useState("Views(Latest Update)");
  const [selectedValue, setSelectedValue] = useState("views");

  const mapChartData = (data, value) => {
    return data[value].historical.values.map((item) => ({
      date: item.date,
      value: item.value,
    }));
  };

  const viewsTabHandler = () => {
    setViewBtnStyle(styles.viewActiveTab);
    setDownloadsBtnStyle(styles.downloadsTab);
    setTxt("Views(Latest Update)");
    setSelectedValue("views");
  };

  const downloadsTabHandler = () => {
    setDownloadsBtnStyle(styles.downloadsActiveTab);
    setViewBtnStyle(styles.viewTab);
    setTxt("Downloads(Latest Update)");
    setSelectedValue("downloads");
  };

  const getChartData = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/users/${username}/statistics/?quantity=4&client_id=3jA8JqRSjVb891zVslTQsYPqZEI8bZ1AbIQkkgyJxNw`
      );
      const mydata = await response.json();
      const selectedChartData = mapChartData(mydata, selectedValue);

      setChartValueList(selectedChartData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChartData();
  }, [selectedValue]);

  const formatLabel = (value) => {
    return `${value / 1000}k`;
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} onPress={onClose} />
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={viewBtnStyle} onPress={viewsTabHandler}>
            <Text style={styles.tabTxt}>Views</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={downloadsBtnStyle}
            onPress={downloadsTabHandler}
          >
            <Text style={styles.tabTxt}>Downloads</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            paddingTop: 10,
            color: Colors.white,
          }}
        >
          {text}
        </Text>
        <View>
          <VictoryChart width={300} height={250} theme={VictoryTheme.material}>
            {/* <VictoryAxis
            // tickFormat={() => ""}
            style={{
              // axis: { stroke: "none" },
              // ticks: { stroke: "none" },
              // tickLabels: { fill: "none" },
              grid: { stroke: "transparent" },
            }}
          /> */}
            {/* <VictoryAxis
            style={{
              tickLabels: { angle: 15, textAnchor: "start" },
            }}
          /> */}
            <VictoryAxis
              dependentAxis
              tickFormat={formatLabel}
              style={{
                axis: { stroke: "none" },
                ticks: { stroke: "none" },
                tickLabels: { fill: "none" },
                grid: { stroke: "transparent" },
              }}
              tickLabelComponent={<VictoryLabel dx={8} />}
            />
            <VictoryAxis
              style={{
                tickLabels: {
                  angle: -15,
                  textAnchor: "start",
                  fill: Colors.white,
                },
                // axis: { stroke: "none" },
                ticks: { stroke: "none" },
                // tickLabels: { fill: "none" },
                grid: { stroke: "transparent" },
                // axis: { stroke: '#FFFFFF' },
                // axisLabel: { fill: '#FFFFFF' },
                // tickLabels: { fill: "#FFFFFF" },
              }}
              tickLabelComponent={<VictoryLabel dy={-5} dx={-53} />}
            />
            {/* <VictoryLine data={chartValueList} x="date" y="value" /> */}
            <VictoryBar
              data={chartValueList}
              x="date"
              y="value"
              labels={({ datum }) => formatLabel(datum.value)}
              labelComponent={<VictoryLabel dy={-1} />}
              style={{ data: { fill: Colors.white } }}
            />
          </VictoryChart>
        </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  container: {
    position: "absolute",
    top: "45%",
    left: "42%",
    transform: [{ translateX: -160 }, { translateY: -130 }],
    backgroundColor: Colors.black,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    // height: 200,
    // width: 300,
  },
  close: {
    fontSize: 18,
    // paddingVertical: 10,
    textAlign: "center",
    color: "blue",
    // marginTop: 1,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
  tabTxt: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.white,
  },
  viewTab: {
    borderColor: Colors.blue,
    backgroundColor: Colors.black,
    width: "45%",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingVertical: 10,
  },
  downloadsTab: {
    borderColor: Colors.blue,
    backgroundColor: Colors.black,
    width: "45%",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingVertical: 10,
  },
  viewActiveTab: {
    width: "45%",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingVertical: 10,
    backgroundColor: Colors.blue,
  },
  downloadsActiveTab: {
    width: "45%",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingVertical: 10,
    backgroundColor: Colors.blue,
  },
});
