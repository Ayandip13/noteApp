import * as React from 'react';
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
            screenOptions={
                ({ route }) => ({
                    headerStyle: {
                        backgroundColor: '#064232'
                    },
                    headerTintColor: '#FFF5F2',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: string = '';

                        if (route.name === 'Notes') {
                            iconName = focused ? 'book' : 'book-outline';
                        } else if (route.name === 'Add Note') {
                            iconName = focused ? 'add-circle' : 'add-circle-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#064232',
                    tabBarInactiveTintColor: 'gray',
                })}
        >
            <Tab.Screen name="Notes" options={{ headerShown: false }} component={HomeScreen} />
            <Tab.Screen name="Add Note" component={AddNoteScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{headerTitle: 'Profile'}} />
        </Tab.Navigator>
    );
}