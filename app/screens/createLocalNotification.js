import React from "react";
import {View,Text,Button,TextInput,StyleSheet} from "react-native";

const CreateLocalNotification=()=>{
    return(
        <View>
            <Text>Channel ID</Text>
            <TextInput style = {styles.input}/>

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginRight: 15,
        marginLeft:15,
        marginBottom:15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
     },
  });

export default CreateLocalNotification;