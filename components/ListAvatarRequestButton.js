import React from "react";
import { View, Button, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "native-base";
import Colors from "../constants/Colors";


const ListAvatarRequestButton = (props) => {
  
  return (
    <View style={{flexDirection:'row'}}>
      <TouchableOpacity onPress={props.acceptHandler} style={styles.buttonContainer}>
        <Text style={{ color: Colors.primary }}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.declineHandler} style={styles.buttonContainer}>
        <Text style={{ color: Colors.primary }}>Decline</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    buttonContainer:{
        margin:4,
        padding:4,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:Colors.primary,
        borderRadius: 4
    }
})

export default ListAvatarRequestButton;
