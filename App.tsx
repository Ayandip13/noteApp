import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddNoteScreen from './screens/AddNoteScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerTitleAlign: 'center' }} name="Home" component={HomeScreen} />
        <Stack.Screen name="AddNote" options={{ headerTitleAlign: 'center' }} component={AddNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
