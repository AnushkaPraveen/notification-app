import React from "react";
import {View,Text,Button,StyleSheet,Image,TouchableOpacity,ScrollView,Linking} from "react-native";
import RNFetchBlob from 'rn-fetch-blob'

const Help=()=>{
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
 return(
     <View>
     <View style={styles.mainContainer}>
     <TouchableOpacity style={styles.category_card} onPress={() => Linking.openURL('https://notifee.app/')}>
     <Image source={require("../images/logo.png")} style={styles.logo}/>
              <Text style={styles.topicText} onPress={() => Linking.openURL('http://google.com')}>Notifee Library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category_card} onPress={() => Linking.openURL('https://docs.google.com/document/d/18RmN4mWNm2uY_escm78uecyjSrhz907F98Fr9xsPadg/edit?usp=sharing')}>
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
        borderWidth: 2,
        borderColor: 'white',
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
      }
})
export default Help;