import React from "react";
import {View,Text,Button,StyleSheet} from "react-native";
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
            <View style={styles.styleLoginBtn}> 
            <Button onPress={onDisplayNotification} color={'#234543'} title="Get Notification"/>
            </View>
            <View style={styles.styleLoginBtn}> 
            <Button onPress={()=>navigation.navigate('CreateNotification')} title="Create Local Notification"/>
            </View>
            <View style={styles.styleLoginBtn}> 
            <Button title="Handle Notification" onPress={()=>navigation.navigate('HandleNotification')}/>
            </View>
            <View style={styles.styleLoginBtn}> 
            <Button title="Create Progress Notification" onPress={()=>navigation.navigate('CreateProgressNotification')}/>
            </View>
            <View style={styles.styleLoginBtn}> 
            <Button title="Shedule Notification" onPress={()=>navigation.navigate('SubHome')}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
  styleLoginBtn: {
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black", //button background/border color
    overflow: "hidden",
    marginBottom: 10
  },
});

export default Home;