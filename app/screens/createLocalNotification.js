import React,{useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet,ScrollView} from 'react-native';
import notifee from '@notifee/react-native';
import NotificationHandler from '../notification/notification';

let notificationHandler=new NotificationHandler();

const CreateLocalNotification = () => {
    const[values,setvalues]=useState({channelId:'',channelName:'',notificationId:'',title:'',body:'',color:'',icon:'',image:''})

    const onDisplayNotification=async()=>{
        const channelId = await notifee.createChannel({
          id: values.channelId,
          name:values.channelName ,
        });
    
        await notifee.requestPermission();
        await notifee.displayNotification({
         
          title:values.title,
          body: values.body,
          android: {
            channelId,
            smallIcon: 'ic_launcher',  
        },

        });
      }

const handleChange=(state, value)=>{
    console.log(state,value)
     setvalues({
        ...values,
        [state]:value,
    }) 
}

const setNotifcation=()=>{
    const payload={
        channelId:values.channelId,
        name:values.channelName,
        title:values.title,
        body:values.body,
    }
    notificationHandler.getNotification(payload);
}



  return (
    <ScrollView>
      <Text style={styles.inputText}>Channel Id</Text>
      <TextInput style={styles.input} value={values.channelId} onChangeText={(text)=>handleChange('channelId',text)}/>
      <Text style={styles.inputText}>Channel Name</Text>
      <TextInput style={styles.input} value={values.channelName} onChangeText={(text)=>handleChange('channelName',text)} />
      <Text style={styles.inputText}>Notification Id</Text>
      <TextInput style={styles.input} value={values.notificationId} onChangeText={(text)=>handleChange('notificationId',text)}/>
      <Text style={styles.inputText}>Title</Text>
      <TextInput style={styles.input} value={values.title} onChangeText={(text)=>handleChange('title',text)}/>
      <Text style={styles.inputText}>Notification Body</Text>
      <TextInput style={styles.input} value={values.body} onChangeText={(text)=>handleChange('body',text)}/>
      <Text style={styles.inputText}>Color</Text>
      <TextInput style={styles.input} value={values.color} onChangeText={(text)=>handleChange('color',text)}/>
      <Text style={styles.inputText}>Icon</Text>
      <TextInput style={styles.input} value={values.icon} onChangeText={(text)=>handleChange('icon',text)}/>
      <Text style={styles.inputText}>Image</Text>
      <TextInput style={styles.input} value={values.image} onChangeText={(text)=>handleChange('image',text)}/>
      <View style={styles.buttonArea}>
        <Button title="Submit" onPress={setNotifcation}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
  },
  inputText:{
    marginLeft: 15,
    color:'#000000'
  },
  buttonArea:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:15
  },
 
});

export default CreateLocalNotification;
