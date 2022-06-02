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
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'Shedule') {
              iconName = 'calendar';
              size = focused ? 25 : 20;
              // color = focused ? '#f0f' : '#555';
            } else if (route.name === 'TimeShedule') {
              iconName = 'clock';
              size = focused ? 25 : 20;
              // color = focused ? '#f0f' : '#555';
            }else if (route.name === 'IntervalShedule') {
              iconName = 'hourglass';
              size = focused ? 25 : 20;
              // color = focused ? '#f0f' : '#555';
            }
            return (
              <FontAwesome5
                name={iconName}
                size={size}
                color={color}
              />
            )
          }
        })}
        

        
    // tabBarLabelPosition: "below-icon",
    // tabBarLabelStyle: {
    //   fontWeight: "400",
    //   fontSize: 15
    // },
    
   initialRouteName="Shedule">
        <Tab.Screen name="Shedule" options={{ title: 'Date & Time Shedule'}} component={SheduleNotification} />
        <Tab.Screen name="TimeShedule" options={{ title: 'Time Shedule'}} component={TimeSheduleNotification} />
        <Tab.Screen name="IntervalShedule" options={{ title: 'Interval Shedule'}} component={IntervalSheduleNotification} />   
      </Tab.Navigator>
    </NavigationContainer>
    )
}

export default SubHome;


// tabBarIcon:()=>( <FontAwesome5
//   name='calendar'
//   size={24}
//   color="#000"
// />)