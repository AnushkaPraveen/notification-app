
import React,{useEffect} from 'react';

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
import Help from './app/screens/help';
import SubHome from './app/screens/subHome';
import OneSignal from 'react-native-onesignal';

const Stack = createNativeStackNavigator();

const App= () => {
 
  useEffect(()=>{
    //OneSignal Init Code
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId("d93e3648-2fd4-48eb-be13-955bc5f784ef");
    //END OneSignal Init Code
    
    
    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });
      },[])
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{headerShown: false}} component={Home} />
        <Stack.Screen name="CreateNotification" options={{ title: 'Create/Update Notification' }} component={CreateNotification} />
        <Stack.Screen name="HandleNotification" options={{ title: 'Handle Notification' }} component={HandleNotification} />
        <Stack.Screen name="CreateProgressNotification" options={{ title: 'Create/Update Progress Notificiation' }} component={CreateProgressNotification} />
        <Stack.Screen name="SubHome" options={{ title: 'Shedule Notifications' }} component={SubHome} />
        <Stack.Screen name="Help" options={{ title: 'Help' }} component={Help} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
