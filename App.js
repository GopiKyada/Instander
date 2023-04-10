import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserList from "./screens/Userlist";
import UserDetail from "./screens/UserDetail";
import Message from "./screens/Message";
import ImageScreen from "./screens/ImageScreen";
import TruncatedHeader from "./components/OTHER/TruncatedHeader";
import { Colors } from "./constants/colors";
import SettingScreen from "./screens/SettingScreen";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.black },
            headerTintColor: Colors.white,
            contentStyle: { backgroundColor: Colors.black },
          }}
        >
          <Stack.Screen
            name="Users"
            component={UserList}
            options={{
              title: "Instander",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
          />
          <Stack.Screen
            name="UserDetail"
            component={UserDetail}
            options={({ route }) => ({
              headerTitle: () => (
                <TruncatedHeader title={route.params.itemArr.user.name} />
              ),
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
              headerTitleAlign: "center",
            })}
          />
          <Stack.Screen
            name="Message"
            component={Message}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Image" component={ImageScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
