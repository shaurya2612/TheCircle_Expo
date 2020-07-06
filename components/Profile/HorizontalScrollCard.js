import React from "react";
import SignupFormPhoto from "../SignupFormPhoto";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "native-base";
import Colors from "../../constants/Colors";
import { Divider } from "react-native-elements";


const HorizontalScrollCard = () => {
    return(<View style={styles.cardContainer}>
        <View style={styles.titleContainer}>
            <Text style={{color:Colors.darkText, fontSize: 20, alignItems:"center", justifyContent:"center", fontFamily:"Quicksand"}}>Movies and shows</Text>
        </View>
  <ScrollView
    style={styles.root}
    horizontal={true}
    contentContainerStyle={styles.rootContainer}
  >
      <SignupFormPhoto image="https://picsum.photos/200/300"/>
      <SignupFormPhoto image="https://picsum.photos/200/300"/>
      <SignupFormPhoto image="https://picsum.photos/200/300"/>
      <SignupFormPhoto image="https://picsum.photos/200/300"/>
      <SignupFormPhoto image="https://picsum.photos/200/300"/>
  </ScrollView>
  <View style={{justifyContent:"center", alignItems:"center", padding:10}}>
  <Divider style={{width:"70%", height:2}}/>
  </View>
  
    </View>)
};

const styles = StyleSheet.create({
    cardContainer:{padding:10, paddingRight:0},
    // titleContainer:{padding:10},
    root:{  flexDirection: "row", padding:10 },
    rootContainer:{alignItems:"center", justifyContent:"center"}
})

export default HorizontalScrollCard;
