import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddNoteScreen from "../screens/AddNoteScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#064232'
        },
        headerTintColor: '#FFF5F2'
      }}
    >
      <Stack.Screen options={{ headerTitleAlign: 'center' }} name="Home" component={HomeScreen} />
      <Stack.Screen name="AddNote" options={{ headerTitleAlign: 'center' }} component={AddNoteScreen} />
    </Stack.Navigator>
  );
}