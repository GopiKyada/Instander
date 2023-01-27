import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserList from "./screens/Userlist";
import UserDetail from "./screens/UserDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "white" },
            headerTintColor: "black",
            contentStyle: { backgroundColor: "#dce4e6" },
          }}
        >
          <Stack.Screen name="Users" component={UserList} />
          <Stack.Screen name="UserDetail" component={UserDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
