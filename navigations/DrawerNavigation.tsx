import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import ProfileScreen from '../screens/ProfileScreen';
import AddNoteScreen from '../screens/AddNoteScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        headerStyle: { backgroundColor: '#064232' },
        headerTintColor: '#FFF5F2',
        headerTitleAlign: 'center',
      }}
    >
      <Drawer.Screen name="Tabs" component={TabNavigation} options={{ title: 'Home' }} />
      <Drawer.Screen name="Add Notes" component={AddNoteScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
