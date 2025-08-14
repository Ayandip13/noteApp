// RootNavigation.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "../navigations/StackNavigation";
import DrawerNavigator from "../navigations/DrawerNavigation";
import TabNavigator from "./TabNavigation";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Choose which one you want to use */}
      {/* <Stack.Screen name="Drawer" component={DrawerNavigator} /> */}
      <Stack.Screen name="Tabs" component={TabNavigator} />  
      <Stack.Screen name="Auth" component={AuthStack} />
    </Stack.Navigator>
  );
}