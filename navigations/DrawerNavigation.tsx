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
          backgroundColor: '#064232'
        },
        headerTintColor: '#FFF5F2',
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} // Tab headers handle it
      />
      <Drawer.Screen name="Add Note" component={AddNoteScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
