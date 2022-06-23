import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,Modal,Alert
} from 'react-native';
import notifee from '@notifee/react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import NotificationHandler from '../notification/notification';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { CromaColorPicker as ColorPicker } from "croma-color-picker";
import Toast,{BaseToast} from 'react-native-toast-message';


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

const SheduleNotification = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [actionCount,setActionCount]=useState(1)
  const [values, setvalues] = useState({
    channelId: '',
    channelName: '',
    notificationId: '',
    title: '',
    body: '',
    color: '#495371',
    icon: null,
    image: null,
    importance: 0,
    vibration: null,
    subtitle: '',
    visibility: 0,
    time: null,
    ongoing:null,
    asForegroundService:null,
    colorized:null,
    repeatType:undefined,
    actionIdOne:'',
    actionTitleOne:'',
    actionIdTwo:undefined,
    actionTitleTwo:undefined,
    actionIdThree:undefined,
    actionTitleThree:undefined,
    actions:[],
    iosActions:[],
    actionValues:[{
      title:'actionTitleOne',
      id:'actionIdOne'
    },{
      title:'actionTitleTwo',
      id:'actionIdTwo'
    },{
      title:'actionTitleThree',
      id:'actionIdThree'
    }]

    
  });

  const onDisplayNotification = async () => {
    const channelId = await notifee.createChannel({
      id: values.channelId,
      name: values.channelName,
    });

    await notifee.requestPermission();
    await notifee.displayNotification({
      title: values.title,
      body: values.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
      },
    });
  };

  const handleChange = (state, value) => {
    console.log(state, value);
    setvalues({
      ...values,
      [state]: value,
    });
  };

  const setNotifcation = () => {
    if(values.actionIdOne && values.actionTitleOne){
      values.actions.push({title:values.actionTitleOne,
      pressAction:{
        id:values.actionIdOne 
      }})
      values.iosActions.push({
        id:values.actionIdOne ,
        title:values.actionTitleOne,
      })
    }
    if(values.actionIdTwo && values.actionTitleTwo){
      values.actions.push({title:values.actionTitleTwo,
      pressAction:{
        id:values.actionIdTwo 
      }})
    }
    if(values.actionIdThree && values.actionTitleThree){
      values.actions.push({title:values.actionTitleThree ,
      pressAction:{
        id:values.actionIdThree  
      }})
    }
    const payload = {
      channelId: values.channelId,
      name: values.channelName,
      notificationId:values.notificationId,
      title: values.title,
      body: values.body,
      importance: values.importance,
      vibration: values.vibration,
      visibility: values.visibility,
      Icon: values.icon,
      color: values.color,
      time: values.time,
      ongoing:values.ongoing,
      foregroundService:values.asForegroundService,
      colorized:values.colorized,
      image:values.image,
      dateTime:date,
      repeatType:values.repeatType,
      AndroidActions:values.actions,
      IosActions:values.iosActions
    };
    notificationHandler.scheduleNotification(payload);
    showToast()
  };

  const test=()=>{
    console.log(date);
  }

  const increment=()=>{
    setActionCount(actionCount=>actionCount+1)
    }

    const showToast = () => {
      Toast.show({
        type: 'success',
        text1: '\u2713 Notification Created',
      });
    }

  return (
    <SafeAreaView>
      <ScrollView style={{backgroundColor:'#fff'}}>
      
        <View>
        
          <Text style={styles.topic}>Android Channel Setup</Text>
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
          </View>
        </View>

        <View>
          <Text style={styles.topic}>Notification Setup</Text>
          <Text style={styles.inputText}>Notification Id</Text>
          <TextInput
            style={styles.input}
            value={values.notificationId}
            placeholder="e.g - 123"
            onChangeText={text => handleChange('notificationId', text)}
          />
          <Text style={styles.inputText}>Title</Text>
          <TextInput
            style={styles.input}
            value={values.title}
            numberOfLines={5}
            multiline={true}
            placeholder="e.g - Notification Title"
            onChangeText={text => handleChange('title', text)}
          />
          <Text style={styles.inputText}>Subtitle</Text>
          <TextInput
            style={styles.input}
            value={values.subtitle}
            placeholder="e.g - Notification Subtitle"
            onChangeText={text => handleChange('subtitle', text)}
          />
          <Text style={styles.inputText}>Notification Body</Text>
          <TextInput
            style={[styles.input, styles.specialInput]}
            numberOfLines={5}
            multiline={true}
            value={values.body}
            placeholder="Main body content of the shedule notification"
            onChangeText={text => handleChange('body', text)}
          />
        </View>
<View>
  <Text style={styles.inputText}>Triggers</Text>
  <TextInput
          style={styles.input}
          value={moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")}    
          editable={false} 
        />
  <TouchableOpacity style={styles.ScreenButtonContainer} onPress={() => setOpen(true)}>
          <Text style={styles.ScreenButtonText}>Set Date & Time</Text>
        </TouchableOpacity>
        
  <DatePicker modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }} onDateChange={setDate} />
        
       
        
</View>
 <View>
          <Text style={styles.inputText}>Repeat Type</Text>
          <RNPickerSelect
            onValueChange={value => handleChange('repeatType', value)}
            items={[
              {label: 'Hourly', value: 0},
              {label: 'Daily', value: 1},
              {label: 'Weekly', value: 2},
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
        </View>
        <Text style={styles.topic}>Android Notification Setup</Text>
        <Text style={styles.inputText}>Color</Text>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      ><View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.inputText}>Select a Color</Text>
          <ColorPicker
          onChangeColor={color => {
            handleChange('color', color)
          }}
          style={[{ height: 350 ,marginBottom:10}]}
        /><TouchableOpacity style={styles.ButtonContainer} onPress={()=>{setModalVisible(false)}}>
          <Text style={styles.ButtonText}>select</Text>
        </TouchableOpacity></View></View></Modal>
        <TextInput
          style={{marginRight: 20,
    marginLeft: 20,
    marginBottom: 15,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize:20,
    backgroundColor:values.color,
    color:'white'}}
          value={values.color}
          editable={false}
          onChangeText={text => handleChange('color', text)}
        />
       
        <TouchableOpacity style={styles.ScreenButtonContainer} onPress={()=>{setModalVisible(true)}}>
          <Text style={styles.ScreenButtonText}>Select a Color</Text>
        </TouchableOpacity>
        <Text style={styles.inputText}>Notification Large Icon</Text>
        <TextInput
          style={styles.input}
          value={values.icon}
          onChangeText={text => handleChange('icon', text)}
        />
        <Text style={styles.inputText}>Image</Text>
        <TextInput
          style={styles.input}
          value={values.image}
          placeholder="URL"
          onChangeText={text => handleChange('image', text)}
        />
        <View>
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
        </View>
        <View>
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
        </View>
        <View>
          <Text style={styles.inputText}>Time Stamp</Text>
          <RNPickerSelect
            onValueChange={value => handleChange('time', value)}
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
        </View>
        <View>
          <Text style={styles.inputText}>Ongoing Notification</Text>
          <RNPickerSelect
            onValueChange={value => handleChange('ongoing', value)}
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
        </View>
        <View>
          <Text style={styles.inputText}>asForegroundService</Text>
          <RNPickerSelect
            onValueChange={value => handleChange('asForegroundService', value)}
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
        </View>
        <View>
          <Text style={styles.inputText}>colorized</Text>
          <RNPickerSelect
            onValueChange={value => handleChange('colorized', value)}
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
        </View>

        <Text style={styles.inputText}>Actions</Text>
        
        
        {values.actionValues.slice(0,actionCount).map((item)=>(
          <View key={item.id} style={styles.actionsView}>
        <View style={styles.item}>
          <Text>Title</Text>
          <TextInput
          style={styles.actionInput}
          //value={values.item.title}
          onChangeText={text => handleChange(item.title, text)}
        />
          </View>
          <View style={styles.item}>
          <Text>Id</Text>
          <TextInput
          style={styles.actionInput}
          //value={values.item.id}
          onChangeText={text => handleChange(item.id, text)}
        />
          </View>
          </View>

))}
{actionCount<3 ? <Text style={styles.addIcon}>
<FontAwesome5 
onPress={increment}
                name='plus-circle'
                size={40}
                color="#553C9A"
              />

</Text>:null }

        <View>
        <Text style={styles.topic}>iOS Notification Setup</Text>
        <Text style={styles.inputText}>Color</Text>
        <TextInput
          style={styles.input}
          value={values.color}
          onChangeText={text => handleChange('color', text)}
        />
        </View>

        <TouchableOpacity style={styles.ScreenButtonContainer} onPress={setNotifcation}>
          <Text style={styles.ScreenButtonText}>Create</Text>
        </TouchableOpacity>
      </ScrollView>
      <Toast config={toastConfig} position='top'
        bottomOffset={20}/>
    </SafeAreaView>
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
  specialInput:{
    height:100,
    paddingRight: 15,
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  ButtonContainer: {
    elevation: 8,
    backgroundColor: "#553C9A",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 5,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 10,
    
  },
  ScreenButtonContainer: {
    elevation: 8,
    backgroundColor: "#553C9A",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop: 0,
    marginLeft: 150,
    marginRight: 150,
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
  ScreenButtonText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    textAlign: 'center',
    padding:5
  },
  item: {
    width: '50%', // is 50% of container width
    color:'red'
  },
  addIcon:{
    justifyContent:'center',
    alignSelf:'center'
  },
  actionsView:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
    /* alignItems: 'flex-start' */
  },
  actionInput:{
   
    marginRight: 20,
    marginLeft: 0,
    marginBottom: 15,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
  
},
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
    marginRight:20,
    marginBottom:10
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

export default SheduleNotification;
