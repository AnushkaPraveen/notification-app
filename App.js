
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
import HandleNotification from './app/screens/handleNotification';
import CreateProgressNotification from './app/screens/createProgressNotification';

import SubHome from './app/screens/subHome';

const Stack = createNativeStackNavigator();

const App= () => {
 
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateNotification" options={{ title: 'Create/Update Notification' }} component={CreateNotification} />
        <Stack.Screen name="HandleNotification" options={{ title: 'Handle Notification' }} component={HandleNotification} />
        <Stack.Screen name="CreateProgressNotification" options={{ title: 'Create/Update Progress Notificiation' }} component={CreateProgressNotification} />
        <Stack.Screen name="SubHome" options={{ title: 'Shedule Notifications' }} component={SubHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
