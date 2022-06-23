import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,FlatList,
  Dimensions,
  PixelRatio
} from 'react-native';
import NotificationHandler from '../notification/notification';

const {height, width} = Dimensions.get('window');

let notificationHandler = new NotificationHandler();



const HandleNotification = () => {

    const [values, setvalues] = useState({
     notificationId:'',
     channelId:'',
     badgeCount:0,
     increamentBadgeCount:1,
     decreamentBadgeCount:1
      });
    const[triggerNotifications,settriggerNotification]=useState([])

      const handleChange = (state, value) => {
        console.log(state, value);
        setvalues({
          ...values,
          [state]: value,
        });
      };
      const getData=async()=>{
        const returnedValue = await notificationHandler.getTriggerNotification()
        settriggerNotification(returnedValue)
        console.log(JSON.stringify(returnedValue));
        console.log(triggerNotifications);
       
      }
      const getBadgeCount = async () => {
       const value =  await notificationHandler.getBadgeCount();
       console.log(value);
       Alert.alert("Badge Count: "+ value);
      }
    
      const setBadgeCount =() => {
        notificationHandler.setBadgeCount(parseInt(values.badgeCount))
      }

      const Increment = () =>{
       notificationHandler.incrementBadgeCount(parseInt(values.increamentBadgeCount))
      }

      const Decrement = () =>{
       notificationHandler.decrementBadgeCount(parseInt(values.decreamentBadgeCount))
      }

  return (
    <ScrollView style={{backgroundColor:'white'}}>
      <View>
        <Text style={styles.topic}>Common Functions</Text>
        <Text style={styles.inputText}>Cancel Notification</Text>
        <TextInput style={styles.input} placeholder="e.g - 123" onChangeText={text => handleChange('notificationId', text)}/>
        <View>
        <TouchableOpacity style={styles.ButtonContainer} onPress={()=>{notificationHandler.cancelNotification(values.notificationId)}}>
          <Text style={styles.ButtonText}>Cancel Notification</Text>
        </TouchableOpacity>
          
        </View>
      </View>
      <View>
        <Text style={styles.topic}>Android Functions</Text>
        <Text style={styles.inputText}>Delete Channel</Text>
        <TextInput style={styles.input} placeholder="e.g - channel123" onChangeText={text => handleChange('channelId', text)}/>
        <View>
        <TouchableOpacity style={styles.ButtonContainer} onPress={notificationHandler.deleteChannel(values.channelId)}>
          <Text style={styles.ButtonText}>Delete Channel</Text>
        </TouchableOpacity>
          
        </View>
      </View>
      <View>
        <Text style={styles.topic}>Trigger Notifications</Text>
        <View>
        <TouchableOpacity style={styles.ButtonContainer} onPress={
        getData}>
          <Text style={styles.ButtonText}>Get Trigger Notification Details</Text>
          
        </TouchableOpacity>
        {triggerNotifications!=''?<Text style={styles.triggerTitleText}>Notification Ids</Text>:null}
        {triggerNotifications.map((id)=>(
          <View>
         
          <Text style={styles.triggerText}>{'\u2B24' + ' '}{id}</Text>
          </View>
         
        ))}
        </View>
      </View>
      <View>
        <Text style={styles.topic}>iOS Badge</Text>
        <View>
        <Text style={styles.inputText}>Set Badge Count</Text>
        <TextInput style={styles.input} placeholder="e.g - 123"
        keyboardType='numeric' onChangeText={text => handleChange('badgeCount', text)}/>
         <TouchableOpacity style={styles.ButtonContainer} onPress={setBadgeCount}>
          <Text style={styles.ButtonText}>Set Badge Count</Text>
        </TouchableOpacity> 
        </View>
        <View>
        <Text style={styles.inputText}>Increment Badge Count</Text>
        <TextInput style={styles.input} placeholder="e.g - 123"
        keyboardType='numeric' onChangeText={text => handleChange('increamentBadgeCount', text)}/>
         <TouchableOpacity style={styles.ButtonContainer} onPress={Increment}>
          <Text style={styles.ButtonText}>Increment Count</Text>
        </TouchableOpacity> 
        </View>
        <View>
        <Text style={styles.inputText}>Decrement Badge Count</Text>
        <TextInput style={styles.input} placeholder="e.g - 123"
        keyboardType='numeric' onChangeText={text => handleChange('decreamentBadgeCount', text)}/>
         <TouchableOpacity style={styles.ButtonContainer} onPress={Decrement}>
          <Text style={styles.ButtonText}>Decrement Badge Count</Text>
        </TouchableOpacity> 
        </View>
        <View>
        <Text style={styles.inputText}>Get Badge Count</Text>
        <View>
        <TouchableOpacity style={styles.ButtonContainer} onPress={getBadgeCount}>
          <Text style={styles.ButtonText}>Get Badge Count</Text>
        </TouchableOpacity>
        
        </View>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginRight: (width*5)/ 100,
    marginLeft: (width*5)/ 100,
    marginBottom: 15,
    height: (height * 5.5) / 100,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    color:'#000000',
  },
  inputText: {
    marginLeft: (width*5)/ 100,
    color: '#000000',
    marginTop: (height * 0.5) / 100,
    marginBottom:  (height * 0.5) / 100, 
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
    marginTop: (height * 1.5) / 100,
    marginBottom:  (height * 1.5) / 100,
    color: '#000000',
  },
  ButtonContainer: {
    elevation: 8,
    backgroundColor: "#553C9A",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 0,
    marginLeft: (width*10)/ 100,
    marginRight: (width*10)/ 100,
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
  },
  triggerText:{
    marginLeft: 30,
    color: '#553C9A',
    fontSize:25
  },
  triggerTitleText:{
    marginLeft: 30,
    color:'#111111',
    fontSize:25
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
