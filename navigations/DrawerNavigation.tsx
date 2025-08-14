import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigation'; // nested tabs
import ProfileScreen from '../screens/ProfileScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#064232',
        },
        headerTintColor: '#FFF5F2',
      }}
    >
      {/* Tabs will be the main thing inside Drawer */}
      <Drawer.Screen name="Notes" options={{ headerTitleAlign: 'center' }} component={TabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Add Note" component={AddNoteScreen} />
    </Drawer.Navigator>
  );
}
