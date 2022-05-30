import React from "react";
import {View,Text,Button,StyleSheet,Image,TouchableOpacity,ScrollView} from "react-native";
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
        <ScrollView style={{backgroundColor:'white'}}>
        <View style={styles.topArea}>
        <Text style={styles.mainTopic}>Notifee Demo</Text>
        <Image source={require('../images/notifee.png')} style={styles.logo}/>
        </View>
            <View> 
            <TouchableOpacity
                 style={styles.ButtonContainer} onPress={onDisplayNotification}><Text style={styles.ButtonText}>Quick Notification</Text>
            </TouchableOpacity> 
            </View>
            <View> 
            <TouchableOpacity
                 style={styles.ButtonContainer} onPress={()=>navigation.navigate('CreateNotification')}><Text style={styles.ButtonText}>Create Local Notification</Text>
            </TouchableOpacity> 
            </View>
            <View>
            <TouchableOpacity
                 style={styles.ButtonContainer} onPress={()=>navigation.navigate('HandleNotification')}><Text style={styles.ButtonText}>Handle Notification</Text>
            </TouchableOpacity>  
            </View>
            <View>
            <TouchableOpacity
                 style={styles.ButtonContainer} onPress={()=>navigation.navigate('CreateProgressNotification')}><Text style={styles.ButtonText}>Create Progress Notification</Text>
            </TouchableOpacity> 
            </View>
            <View> 
            <TouchableOpacity
                 style={styles.ButtonContainer} onPress={()=>navigation.navigate('SubHome')}><Text style={styles.ButtonText}>Shedule Notification</Text>
            </TouchableOpacity>
            </View>
            <View> 
            <TouchableOpacity
                 style={styles.ButtonContainer} onPress={()=>navigation.navigate('Help')}><Text style={styles.ButtonText}>Help</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
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
    marginBottom: 10,
    padding:10
  },
topArea:{
    justifyContent:'center',
    alignItems:'center'
  },
  mainTopic:{
    fontSize:35,
    fontWeight:'bold',
    color:'black',
    marginTop:30
  },
  logo:{
    width:200,
    height:200,
   
  },
 ButtonContainer: {
    elevation: 8,
    backgroundColor: "#553C9A",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 10,
    
  },
  ButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    textAlign: 'center',
    padding:5
  }
});

export default Home;