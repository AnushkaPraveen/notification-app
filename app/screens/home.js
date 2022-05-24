import React from "react";
import {View,Text,Button} from "react-native";
import notifee, { TimestampTrigger, TriggerType, TimeUnit ,AndroidVisibility,AndroidCategory,AndroidImportance } from '@notifee/react-native';




const Home=({navigation})=>{

    const onDisplayNotification=async()=>{
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });
    
        await notifee.requestPermission();
       await notifee.displayNotification({
         
          title: 'Notification Title',
          body: 'Main body content of the notification',
          android: {
            channelId,
            smallIcon: 'ic_launcher',  // optional, defaults to 'ic_launcher'.
             // Recommended to set a category
            category: AndroidCategory.CALL,
        // Recommended to set importance to high
            importance: AndroidImportance.HIGH,
            fullScreenAction: {
          id: 'default',
        },
          },
        });
      }
    return(
        <View>
            <Text>This is Home page</Text>
            <Button onPress={onDisplayNotification} title="Get Notification"/>
            <Button onPress={()=>navigation.navigate('CreateNotification')} title="Create Local Notification"/>
            <Button title="Create Local Notification"/>
        </View>
    )
}

export default Home;