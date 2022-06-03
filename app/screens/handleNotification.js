import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import NotificationHandler from '../notification/notification';

let notificationHandler = new NotificationHandler();



const HandleNotification = () => {

    const [values, setvalues] = useState({
     notificationId:'',
     channelId:''
      });
    const[triggerNotifications,settriggerNotification]=useState([])

      const handleChange = (state, value) => {
        console.log(state, value);
        setvalues({
          ...values,
          [state]: value,
        });
      };
      const getData=()=>{
       notificationHandler.getTriggerNotification()
       
      }
    
  return (
    <ScrollView style={{backgroundColor:'white'}}>
      <View>
        <Text style={styles.topic}>Common Functions</Text>
        <Text style={styles.inputText}>Cancel Notification</Text>
        <TextInput style={styles.input} onChangeText={text => handleChange('notificationId', text)}/>
        <View>
        <TouchableOpacity style={styles.ButtonContainer} onPress={()=>{notificationHandler.cancelNotification(values.notificationId)}}>
          <Text style={styles.ButtonText}>Cancel Notification</Text>
        </TouchableOpacity>
          
        </View>
      </View>
      <View>
        <Text style={styles.topic}>Android Functions</Text>
        <Text style={styles.inputText}>Delete Channel</Text>
        <TextInput style={styles.input} onChangeText={text => handleChange('channelId', text)}/>
        <View>
        <TouchableOpacity style={styles.ButtonContainer} onPress={()=>{notificationHandler.deleteChannel(values.channelId)}}>
          <Text style={styles.ButtonText}>Delete Channel</Text>
        </TouchableOpacity>
          
        </View>
      </View>
      <View>
        <Text style={styles.topic}>Trigger Notifications</Text>
        <View>
        <TouchableOpacity style={styles.ButtonContainer} onPress={
        getData}>
          <Text style={styles.ButtonText}>Delete Channel</Text>
        </TouchableOpacity>
        
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 15,
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
  },
  inputText: {
    marginLeft: 20,
    color: '#000000',
  },
  buttonArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  topic: {
    fontSize: 25,
    marginLeft: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  ButtonContainer: {
    elevation: 8,
    backgroundColor: "#553C9A",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 0,
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default HandleNotification;
