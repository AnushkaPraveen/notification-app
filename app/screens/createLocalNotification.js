import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  Modal,
  Alert
} from 'react-native';
import notifee from '@notifee/react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import NotificationHandler from '../notification/notification';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import { SketchPicker } from 'react-color';
import { CromaColorPicker as ColorPicker } from "croma-color-picker";

let notificationHandler = new NotificationHandler();

const CreateLocalNotification = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [values, setvalues] = useState({
    channelId: '',
    channelName: '',
    notificationId: '',
    title: '',
    body: '',
    color: '',
    icon: null,
    image: null,
    importance: 0,
    vibration: null,
    subtitle: '',
    visibility: 0,
    time: null,
    ongoing:null,
    asForegroundService:null,
    colorized:null
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
      image:values.image
    };
    notificationHandler.getNotification(payload);
  };

  return (
    <SafeAreaView>
      <ScrollView style={{backgroundColor:'white'}}>
      
        <View>
        
          <Text style={styles.topic}>Android Channel Setup</Text>
          <Text style={styles.inputText}>Channel Id</Text>
          <TextInput
            style={styles.input}
            value={values.channelId}
            onChangeText={text => handleChange('channelId', text)}
          />
          <Text style={styles.inputText}>Channel Name</Text>
          <TextInput
            style={styles.input}
            value={values.channelName}
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
              style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 20,
                  right: 10,
                  borderWidth: 1,
                  borderColor: 'red',
                },
                placeholder: {
                  color: 'purple',
                  fontSize: 12,
                  fontWeight: 'bold',
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
            onChangeText={text => handleChange('notificationId', text)}
          />
          <Text style={styles.inputText}>Title</Text>
          <TextInput
            style={styles.input}
            value={values.title}
            onChangeText={text => handleChange('title', text)}
          />
          <Text style={styles.inputText}>Subtitle</Text>
          <TextInput
            style={styles.input}
            value={values.subtitle}
            onChangeText={text => handleChange('subtitle', text)}
          />
          <Text style={styles.inputText}>Notification Body</Text>
          <TextInput
            style={styles.input}
            value={values.body}
            onChangeText={text => handleChange('body', text)}
          />
        </View>

        <Text style={styles.topic}>Android Notification Setup</Text>
        <Text style={styles.inputText}>Color</Text>
        <Button title="open" onPress={()=>{setModalVisible(true)}}/>
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
          <ColorPicker
          onChangeColor={color => {
            setColor(color);
          }}
          style={[{ height: 350 }]}
        /><Text>Hello</Text></View></View></Modal>
        <TextInput
          style={styles.input}
          value={values.color}
          onChangeText={text => handleChange('color', text)}
        />
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

        <View style={styles.buttonArea}>
          <Button title="Submit" onPress={setNotifcation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 15,
    height: 50,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor:'#00000099'

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
});

export default CreateLocalNotification;
