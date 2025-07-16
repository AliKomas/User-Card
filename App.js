import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Kullanıcılar" component={HomeScreen} />
        <Stack.Screen 
          name="Detay" 
          component={DetailScreen} 
          options={({ route }) => ({ title: route.params.user.name })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
