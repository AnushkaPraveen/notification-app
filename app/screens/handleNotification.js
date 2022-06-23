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
import Toast,{BaseToast} from 'react-native-toast-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const {height, width} = Dimensions.get('window');

let notificationHandler = new NotificationHandler();

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#4CAF50' ,backgroundColor:'#553C9A',color:'red'}}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: '400',
        color:'white'
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: '400',
        color:'white'
      }}
    />
  ),}

const HandleNotification = () => {

    const [values, setvalues] = useState({
     notificationId:'',
     channelId:'',
     badgeCount:0,
     increamentBadgeCount:1,
     decreamentBadgeCount:1,
     channelName:'',
     vibration: null,
     visibility:0,
     importance:0
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
        const payload={
          text:'\u2713 Trigger Notifications Ids Shown'
        }
        const returnedValue = await notificationHandler.getTriggerNotification()
        if(returnedValue==''){
          Alert.alert("Trigger Notifications","No Any Trigger Notifications");
          
        }else{
          settriggerNotification(returnedValue)
          showToast(payload)
          console.log(JSON.stringify(returnedValue));
          console.log(triggerNotifications);
        }
        
       
      }
      const getBadgeCount = async () => {
       const value =  await notificationHandler.getBadgeCount();
       console.log(value);
       Alert.alert("Badge Count: "+ value);
      }
    
      const setBadgeCount =() => {
        const payload={
          text:`\u2713 Badge Count Set by ${values.badgeCount}`
        }
        notificationHandler.setBadgeCount(parseInt(values.badgeCount))
        showToast(payload)
      }

      const Increment = () =>{
        const payload={
          text:`\u2713 Badge Count Incremented by ${values.increamentBadgeCount}`
        }
       notificationHandler.incrementBadgeCount(parseInt(values.increamentBadgeCount))
       showToast(payload)
      }

      const Decrement = () =>{
        const payload={
          text:`\u2713 Badge Count Decremented ${values.decreamentBadgeCount}`
        }
       notificationHandler.decrementBadgeCount(parseInt(values.decreamentBadgeCount))
       showToast(payload)
      }

      const showToast = (payload) => {
        Toast.show({
          type: 'success',
          text1: payload.text,
        });
      }

      const cancelNotification=()=>{
        if(!values.notificationId){
           Alert.alert("No any data")
        }else{
          const payload={
            text:'\u2713 Notification Canceled'
          }
          notificationHandler.cancelNotification(values.notificationId)
          showToast(payload)
        }
      } 

      const deleteChannel=()=>{
        if(!values.channelId){
           Alert.alert("No any data")
        }else{
          const payload={
            text:'\u2713 Channel Deleted'
          }
          notificationHandler.deleteChannel(values.channelId)
          showToast(payload)
        }
      } 
      const setChannel=()=>{
        const payload={
          id: values.channelId,
          name: values.channelName,
          importance:values.importance,
          vibration: values.vibration,
          visibility:values.visibility
        }
        const message={
          text:'\u2713 Channel Created'
        }
        notificationHandler.setChannel(payload)
        showToast(message)
      }


  return (
    <SafeAreaView>
    <ScrollView style={{backgroundColor:'white'}}>
    
      <View>
        <Text style={styles.topic}>Common Functions</Text>
        <Text style={styles.subTopic}>Cancel Notification</Text>
        <Text style={styles.inputText}>Notification Id</Text>
        <TextInput style={styles.input} placeholder="e.g - 123" onChangeText={text => handleChange('notificationId', text)}/>
        <View>
        <TouchableOpacity style={styles.ButtonContainer} onPress={cancelNotification}>
          <Text style={styles.ButtonText}>Cancel Notification</Text>
        </TouchableOpacity>
          
        </View>
      </View>
      <View>
        <Text style={styles.topic}>Android Functions</Text>
        <View>
    <Text style={styles.subTopic}>Channel Create</Text>
    <Text style={styles.inputText}>Channel Id</Text>
          <TextInput
            style={styles.input}
            value={values.channelId}
            placeholder="e.g - channel123"
            onChangeText={text => handleChange('channelId', text)}
          />
          <Text style={styles.inputText}>Channel Name</Text>
          <TextInput
            style={styles.input}
            value={values.channelName}
            placeholder="e.g - Channel 123"
            onChangeText={text => handleChange('channelName', text)}
          />
          <View>
            <Text style={styles.inputText}>Vibration</Text>
            
            <RNPickerSelect
              onValueChange={value => handleChange('vibration', value)}
              items={[
                {label: 'On', value: true},
                {label: 'Off', value: false},
              ]}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false} 
              Icon={() => {
              return  <FontAwesome5
                name='angle-down'
                size={24}
                color="#000"
              />;
            }}
            />
            <Text style={styles.inputText}>Importance</Text>
          <RNPickerSelect
            onValueChange={value => handleChange('importance', value)}
            items={[
              {label: 'None', value: 0},
              {label: 'Min', value: 1},
              {label: 'Low', value: 2},
              {label: 'Default', value: 3},
              {label: 'High', value: 4},
            ]}
            style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false} 
              Icon={() => {
              return  <FontAwesome5
                name='angle-down'
                size={24}
                color="#000"
              />;
            }}
          />
        
          <Text style={styles.inputText}>Visibility</Text>
          <RNPickerSelect
            onValueChange={value => handleChange('visibility', value)}
            items={[
              {label: 'Private', value: 0},
              {label: 'Public', value: 1},
              {label: 'Secret', value: -1},
            ]}
            style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false} 
              Icon={() => {
              return  <FontAwesome5
                name='angle-down'
                size={24}
                color="#000"
              />;
            }}
          />
          <View>
        <TouchableOpacity style={styles.ButtonContainer} onPress={setChannel}>
          <Text style={styles.ButtonText}>Create/Update Channel</Text>
        </TouchableOpacity>
          
        </View>
          </View>
      </View>
      <Text style={styles.subTopic}>Delete Channel</Text>
        <Text style={styles.inputText}>Channel Id</Text>
        <TextInput style={styles.input} placeholder="e.g - channel123" onChangeText={text => handleChange('channelId', text)}/>
        <View>
        <TouchableOpacity style={styles.ButtonContainer} onPress={deleteChannel}>
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
          <View key={id}>
         
          <Text style={styles.triggerText}>{'\u2B24' + ' '}{id}</Text>
          </View>
         
        ))}
        </View>
      </View>
      <View>
        <Text style={styles.topic}>iOS Badge</Text>
        <View>
        <Text style={styles.subTopic}>Set Badge Count</Text>
        <Text style={styles.inputText}>Count</Text>
        <TextInput style={styles.input} placeholder="e.g - 123"
        keyboardType='numeric' onChangeText={text => handleChange('badgeCount', text)}/>
         <TouchableOpacity style={styles.ButtonContainer} onPress={setBadgeCount}>
          <Text style={styles.ButtonText}>Set Badge Count</Text>
        </TouchableOpacity> 
        </View>
        <View>
        <Text style={styles.subTopic}>Increament Badge Count</Text>
        <Text style={styles.inputText}>Count</Text>
        <TextInput style={styles.input} placeholder="e.g - 123"
        keyboardType='numeric' onChangeText={text => handleChange('increamentBadgeCount', text)}/>
         <TouchableOpacity style={styles.ButtonContainer} onPress={Increment}>
          <Text style={styles.ButtonText}>Increment Count</Text>
        </TouchableOpacity> 
        </View>
        <View>
        <Text style={styles.subTopic}>Decrement Badge Count</Text>
        <Text style={styles.inputText}>Count</Text>
        <TextInput style={styles.input} placeholder="e.g - 123"
        keyboardType='numeric' onChangeText={text => handleChange('decreamentBadgeCount', text)}/>
         <TouchableOpacity style={styles.ButtonContainer} onPress={Decrement}>
          <Text style={styles.ButtonText}>Decrement Badge Count</Text>
        </TouchableOpacity> 
        </View>
        <View>
        <Text style={styles.subTopic}>Get Badge Count</Text>
        <View>
        <TouchableOpacity style={styles.ButtonContainer} onPress={getBadgeCount}>
          <Text style={styles.ButtonText}>Get Badge Count</Text>
        </TouchableOpacity>
        
        </View>
      </View>
      
      </View>
      
    </ScrollView>
    <Toast config={toastConfig} position='top'
        bottomOffset={20}/>
     </SafeAreaView>
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
  subTopic:{
    fontSize: 20,
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
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginLeft:20,
    marginRight:20
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginLeft:20,
    marginRight:20
  },
  placeholder: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  /* icon: {
		position: 'absolute',
		backgroundColor: 'red',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 0,
	}, */
  iconContainer: {
    placeholderColor: 'red',
    top: 10,
    right: 30
  },
});

export default HandleNotification;
