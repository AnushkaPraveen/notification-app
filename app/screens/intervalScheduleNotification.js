import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native';
import notifee from '@notifee/react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import NotificationHandler from '../notification/notification';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import { CromaColorPicker as ColorPicker } from "croma-color-picker";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

let notificationHandler = new NotificationHandler();

const IntervalSheduleNotification = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
    interval:0,
    timeunit:""
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
      timeunit:values.timeunit,
      interval:parseInt(values.interval)
    };
    notificationHandler.IntervalScheduleNotification(payload);
  };

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
            value={values.body}
            numberOfLines={5}
            multiline={true}
            placeholder="Main body content of the notification"
            onChangeText={text => handleChange('body', text)}
          />
        </View>
        <View>
          <Text style={styles.topic}>
            Interval Trigger
          </Text>
          <Text style={styles.inputText}>Time Unit</Text>
          <RNPickerSelect
            onValueChange={value => handleChange('timeunit', value)}
            items={[
              {label: 'Seconds', value: "SECONDS"},
              {label: 'Minutes', value: "MINUTES"},
              {label: 'Hours', value: "HOURS"},
              {label: 'Days', value: "DAYS"}
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
          <Text style={styles.inputText}>Interval Period</Text>
          <TextInput
          style={styles.input}
          value={values.interval}
          keyboardType='numeric'
          onChangeText={text => handleChange('interval', text)}
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

export default IntervalSheduleNotification;
