import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from './DrawerNavigation';
// import AuthStack from './AuthStack'; // optional if/when you add auth

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="App" component={DrawerNavigation} />
      {/* <Stack.Screen name="Auth" component={AuthStack} /> */}
    </Stack.Navigator>
  );
}
