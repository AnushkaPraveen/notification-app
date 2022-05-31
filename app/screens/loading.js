import React,{useEffect} from 'react';
import {View,Text,ActivityIndicator,StyleSheet,Image} from 'react-native';

const Loading=({navigation})=>{
    useEffect(()=>{
        setTimeout(()=>{
            navigation.replace('Home');
        },1000)
    }) 
    return(
        <View>
        <View style={styles.mainContainer}>
        <Text style={styles.topic}>Notifee Demo App</Text>
        <Image source={require("../images/notifee.png")} style={styles.logo}/>
<ActivityIndicator style={styles.spinner} size="large" color="#553C9A" />
</View>
        </View>
    )
}
const styles=StyleSheet.create({
logo:{
    width:250,
    height:250,
   
},
mainContainer:{
    marginTop:150,
    justifyContent:'center',
    alignItems:'center'
},
spinner:{
    marginTop:80
},
topic:{
    fontSize:35,
    fontWeight:'600',
    color:'#553C9A'
}})
export default Loading;