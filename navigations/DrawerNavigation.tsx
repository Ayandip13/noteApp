import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import AddNoteScreen from '../screens/AddNoteScreen';

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
      <Drawer.Screen options={{ headerTitleAlign: 'center' }} name="Home" component={HomeScreen} />
      <Drawer.Screen options={{ headerTitleAlign: 'center' }} name="Note" component={AddNoteScreen} />
    </Drawer.Navigator>
  );
}
