import React,{useState} from "react";
import {View,Text,Button,StyleSheet,Image,TouchableOpacity,ScrollView,Linking,Modal} from "react-native";
import RNFetchBlob from 'rn-fetch-blob'
import { CromaColorPicker as ColorPicker } from "croma-color-picker";

const Help=()=>{
  const[color,setColor]=useState('')
  const [modalVisible, setModalVisible] = useState(false);
/* const { config, fs } = RNFetchBlob
let PictureDir = fs.dirs.PictureDir // this is the pictures directory. You can check the available directories in the wiki.
let options = {
  fileCache: true,
  addAndroidDownloads : {
    useDownloadManager : true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
    notification : false,
    path:  PictureDir + "/me_"+Math.floor(date.getTime() + date.getSeconds() / 2), // this is the path where your downloaded file will live in
    description : 'Downloading image.'
  }
}
config(options).fetch('GET', "http://www.example.com/example.pdf").then((res) => {
  // do some magic here
}) */

const getFile=()=>{
  //Function to check the platform
    //If iOS the start downloading
    //If Android then ask for runtime permission
    if (Platform.OS === 'ios') {
      fileDownload();
    } else {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title:'storage title',
            message:'storage_permission',
          },
        ).then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //Once user grant the permission start downloading
            console.log('Storage Permission Granted.');
            fileDownload();
          } else {
            //If permission denied then show alert 'Storage Permission Not Granted'
           Alert.alert('storage_permission');
          }
        });
      } catch (err) {
        //To handle permission related issue
        console.log('error', err);
      }
    }
}

const fileDownload=async()=>{
  const { config, fs } = RNFetchBlob;
  let PictureDir = fs.dirs.DownloadDir;
  let date = new Date();
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      //Related to the Android only
      useDownloadManager: true,
      notification: true,
      path:PictureDir + '/Report_Download' + Math.floor(date.getTime() + date.getSeconds() / 2),
      description: 'Risk Report Download',
    },
  };
  config(options)
    .fetch('GET', 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg')
    .then((res) => {
      //Showing alert after successful downloading
      console.log('res -> ', JSON.stringify(res));
      alert('Report Downloaded Successfully.');
    });
}

 return(
     <View>
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
      <Button title="open" onPress={()=>{setModalVisible(true)}}/>
     <View style={styles.mainContainer}>
    
     <TouchableOpacity style={styles.category_card} onPress={() => Linking.openURL('https://notifee.app/')}>
     <Image source={require("../images/logo.png")} style={styles.logo}/>
              <Text style={styles.topicText} onPress={() => Linking.openURL('http://google.com')}>Notifee Library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category_card} onPress={() => Linking.openURL('https://drive.google.com/file/d/1dHrZDvHM0SdVdpVXmnPTmEg9DN5PCmjP/view?usp=sharing')}>
            <Image source={require("../images/document.png")} style={styles.logo}/>
              <Text style={styles.topicText}>Pre Defined Documentation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category_card} onPress={() => Linking.openURL('https://github.com/AnushkaPraveen/RN-Notifee')}>
            <Image source={require("../images/github.png")} style={styles.logo}/>
              <Text style={styles.topicText}>github Repo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category_card} onPress={() => Linking.openURL('https://github.com/invertase/react-native-notifee/tree/master/example')}>
            <Image source={require("../images/code.png")} style={styles.logo}/>
              <Text style={styles.topicText}>Sample App by Notifiee</Text>
            </TouchableOpacity>
     </View>
         
     </View>
 )   
}
const styles = StyleSheet.create
({
    category_card: {
        backgroundColor: 'white',
        width: 150,
        height: 150,
        marginTop: 14,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#553C9A',
        justifyContent:'center',
        alignItems:'center',
      },
      mainContainer:{
          
          
          marginTop:120,
          justifyContent:'center',
          alignContent:'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    
      },logo:{
          
          width:100,
          height:100,
          
          
      },
      topicText:{
          textAlign:'center',
          fontSize:15,
          fontWeight:'600'
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
})
export default Help;