import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#064232'
        },
        headerTintColor: '#FFF5F2'
      }}>
      <Drawer.Screen
        options={{
          headerTitleAlign: 'center'
        }}
        name="Notes"
        component={HomeScreen} />
      <Drawer.Screen
        options={{
          headerTitleAlign: 'center'
        }}
        name="Add Note"
        component={AddNoteScreen} />
      <Drawer.Screen
        options={{
          headerTitleAlign: 'center'
        }}
        name="Profile"
        component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
