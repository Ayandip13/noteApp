import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "../navigations/StackNavigation";
import TabNavigator from "../navigations/DrawerNavigation";
import DrawerNavigator from "../navigations/DrawerNavigation";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="Auth" component={AuthStack} />
    </Stack.Navigator>
  );
}