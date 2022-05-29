import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SheduleNotification from './sheduleNotification';
import TimeSheduleNotification from './TimeSheduleNotification';
import IntervalSheduleNotification from './intervalScheduleNotification';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const SubHome=()=>{
    return(
        <NavigationContainer independent={true}>
      <Tab.Navigator screenOptions={{
    tabBarLabelPosition: "below-icon",
    tabBarLabelStyle: {
      fontWeight: "400",
      fontSize: 15
    },
    
  }} initialRouteName="Shedule">
        <Tab.Screen name="Shedule" options={{ title: 'Date & Time Shedule',tabBarIcon:()=>( <FontAwesome5
                name='calendar'
                size={24}
                color="#000"
              />)}} component={SheduleNotification} />
        <Tab.Screen name="TimeShedule" options={{ title: 'Time Shedule',tabBarIcon:()=>( <FontAwesome5
                name='clock'
                size={24}
                color="#000"
              />) }} component={TimeSheduleNotification} />
        <Tab.Screen name="IntervalShedule" options={{ title: 'Interval Shedule',tabBarIcon:()=>( <FontAwesome5
                name='hourglass'
                size={24}
                color="#000"
              />) }} component={IntervalSheduleNotification} />   
      </Tab.Navigator>
    </NavigationContainer>
    )
}

export default SubHome;