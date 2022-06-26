import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { View, StatusBar } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#232630" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}
