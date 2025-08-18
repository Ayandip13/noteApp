import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { RootState } from '../src/store/store';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DrawerNavigator from './DrawerNavigation';
import DrawerNavigator2 from './DrawerNavigation2';
import DrawerNavigator3 from './DrawerNavigation3';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  // Get theme from Redux
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';
          if (route.name === 'Home') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'AddNote') iconName = focused ? 'add-circle' : 'add-circle-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme === 'dark' ? '#fff' : '#064232',
        tabBarInactiveTintColor: theme === 'dark' ? '#888' : 'gray',
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#000' : '#064232',
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: theme === 'dark' ? '#FFF' : '#FFF5F2',
        },
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#111' : '#FFF',
        },
      })}
    >
      <Tab.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="AddNote" component={DrawerNavigator2} options={{ title: 'Add Note' }} />
      <Tab.Screen name="Profile" component={DrawerNavigator3} />
    </Tab.Navigator>
  );
}
