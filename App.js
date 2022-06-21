
import React,{useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./app/screens/home"
import CreateNotification from "./app/screens/createLocalNotification"
import HandleNotification from './app/screens/handleNotification';
import CreateProgressNotification from './app/screens/createProgressNotification';
import Help from './app/screens/help';
import Loading from './app/screens/loading';

import SubHome from './app/screens/subHome';
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();

const App= () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
 
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Loading">
      <Stack.Screen name="Loading" options={{headerShown:false}} component={Loading}/>
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
