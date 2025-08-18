import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import ProfileScreen from '../screens/ProfileScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator2() {
    return (
        <Drawer.Navigator
            initialRouteName="Add Notes"
            screenOptions={{
                headerStyle: { backgroundColor: '#064232' },
                headerTintColor: '#FFF5F2',
                headerTitleAlign: 'center',
                // headerShown: false
            }}
        >
            <Drawer.Screen name="Add Notes" component={AddNoteScreen} />
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    );
}
