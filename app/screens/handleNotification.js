import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import NotificationHandler from '../notification/notification';

let notificationHandler = new NotificationHandler();



const HandleNotification = () => {

    const [values, setvalues] = useState({
     notificationId:'',
     channelId:''
      });

      const handleChange = (state, value) => {
        console.log(state, value);
        setvalues({
          ...values,
          [state]: value,
        });
      };
    
  return (
    <ScrollView>
      <View>
        <Text>Common Functions</Text>
        <Text style={styles.inputText}>Cancel Notification</Text>
        <TextInput style={styles.input} onChangeText={text => handleChange('notificationId', text)}/>
        <View>
          <Button title='Cancel Notification' onPress={()=>{notificationHandler.cancelNotification(values.notificationId)}}/>
        </View>
      </View>
      <View>
        <Text>Android Functions</Text>
        <Text style={styles.inputText}>Delete Channel</Text>
        <TextInput style={styles.input} onChangeText={text => handleChange('channelId', text)}/>
        <View>
          <Button title='Delete Channel' onPress={()=>{notificationHandler.deleteChannel(values.channelId)}}/>
        </View>
      </View>
      <View>
        <Text>iOS Functions</Text>
        <View>
          <Button title='test'/>
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
    fontSize: 20,
    marginLeft: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
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
