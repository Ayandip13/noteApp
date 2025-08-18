import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawerNavigator from './DrawerNavigation';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      // initialRouteName="Drawer"
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';
          if (route.name === 'Home') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'AddNote') iconName = focused ? 'add-circle' : 'add-circle-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#064232',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#064232',
        },
        headerTitleAlign: 'center',
        headerTitleStyle:{
          color: '#FFF5F2'
        }
      })}
    >
      <Tab.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="AddNote" component={AddNoteScreen} options={{ title: 'Add Note' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
