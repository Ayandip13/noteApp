import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import ProfileScreen from '../screens/ProfileScreen';
import AddNoteScreen from '../screens/AddNoteScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#064232" },
        headerTintColor: "#FFF5F2",
        headerTitleAlign: "center",
      }}
    >
      <Drawer.Screen name="Home" component={TabNavigation} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Add Note" component={AddNoteScreen} />
    </Drawer.Navigator>
  );
}
