import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = ({ lat, lng }) => {
  const initialRegion = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView style={styles.map} region={initialRegion} >
      <Marker coordinate={initialRegion} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    // height: "100%",
    // width: "100%",
    flex: 1,
    width: "95%",
    height: 200,
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});

export default Map;
