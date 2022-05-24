
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./app/screens/home"
import CreateNotification from "./app/screens/createLocalNotification"

const Stack = createNativeStackNavigator();

const App= () => {
 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateNotification" component={CreateNotification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
