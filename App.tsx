import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import RootNavigation from "./navigations/RootNavigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </SafeAreaProvider>
  );
}