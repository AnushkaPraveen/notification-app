import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import notifee from '@notifee/react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import NotificationHandler from '../notification/notification';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';

let notificationHandler = new NotificationHandler();

const CreateProgressNotification = () => {
  const [values, setvalues] = useState({
    channelId: '',
    channelName: '',
    notificationId: '',
    title: '',
    body: '',
    importance: 0,
    vibration: null,
    visibility: 0,
    time: null,
    ongoing:null,
    progressSize:'',
    currentSize:'',
    indeterminate:null,
    color:''
    
  });



  const handleChange = (state, value) => {
    console.log(state, value);
    setvalues({
      ...values,
      [state]: value,
    });
  };

  const setNotifcation = () => {
      console.log(parseInt(values.progressSize));
    const payload = {
      channelId: values.channelId,
      name: values.channelName,
      notificationId:values.notificationId,
      title: values.title,
      body: values.body,
      importance: values.importance,
      vibration: values.vibration,
      visibility: values.visibility,
      time: values.time,
      ongoing:values.ongoing,
      indeterminate:values.indeterminate,
      progressSize:parseInt(values.progressSize),
      currentSize:parseInt(values.currentSize),
      color:values.color
    };
    notificationHandler.progressNotification(payload);
  };

  return (
    <SafeAreaView>
      <ScrollView>
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
          <Text style={styles.inputText}>Notification Body</Text>
          <TextInput
            style={styles.input}
            value={values.body}
            onChangeText={text => handleChange('body', text)}
          />
        </View>

        <Text style={styles.topic}>Android Notification Setup</Text>    
       
        <Text style={styles.inputText}>Progress Size</Text>
          <TextInput
            style={styles.input}
            value={values.progressSize}
            keyboardType='numeric'
            onChangeText={text => handleChange('progressSize',text)}
          />
          <Text style={styles.inputText}>Current Size</Text>
          <TextInput
            style={styles.input}
            value={values.currentSize}
            keyboardType='numeric'
            onChangeText={text => handleChange('currentSize', text)}
          />
          <Text style={styles.inputText}>Color</Text>
        <TextInput
          style={styles.input}
          value={values.color}
          onChangeText={text => handleChange('color', text)}
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
          <Text style={styles.inputText}>indeterminate</Text>
          <RNPickerSelect
            onValueChange={value => handleChange('indeterminate', value)}
            items={[
              {label: 'On', value: true},
              {label: 'Off', value: false},
            ]}
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

export default CreateProgressNotification;
