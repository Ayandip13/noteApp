import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import HomeScreen from '../screens/HomeScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../src/store/store';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <Drawer.Navigator

      screenOptions={{
        headerStyle: { backgroundColor: '#064232' },
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
        drawerContentStyle: { backgroundColor: theme === 'dark' ? '#666' : '#FFF5F2', },
        drawerLabelStyle: { color: theme === 'dark' ? '#fff' : '#000' },
        drawerActiveBackgroundColor: theme === 'dark' ? '#064232' : '#888',
        // drawerInactiveBackgroundColor: '#66C2A6',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen} />
      <Drawer.Screen
        name="Add Notes"
        component={AddNoteScreen} />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
