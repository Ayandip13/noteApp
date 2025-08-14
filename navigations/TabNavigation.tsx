import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: "#064232" },
        headerTintColor: "#FFF5F2",
        headerTitleAlign: "center",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          if (route.name === "Home") iconName = focused ? "book" : "book-outline";
          else if (route.name === "Add Note") iconName = focused ? "add-circle" : "add-circle-outline";
          else if (route.name === "Profile") iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#064232",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Add Note" component={AddNoteScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
