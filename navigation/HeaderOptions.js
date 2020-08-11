import React from 'react';
import { TouchableOpacity, View, Platform} from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';


export const defaultIOSHeaderOptions  = (props)=>{
  return {
    title:"The Circle",
    headerStyle:{backgroundColor:Colors.primary},
    headerTitleStyle:{color:Colors.accent, fontFamily:"Pacifico", fontSize:27},
    headerLeft: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        >
          <Icon
            containerStyle={{
              marginLeft: 15,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
            type="feather"
            size={27}
            color={Colors.accent}
            name={"align-left"}
          />
        </TouchableOpacity>
      );
    },
    headerRight: () => <View></View>,
  }
}


export const defaultHeaderOptions = (props) => {
    return {
      title:Platform.OS==="ios"?"The Circle":null,
      headerTitle: Platform.OS==="ios"?null:"The Circle",
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: Platform.OS==="ios"?null:Colors.accent,
      headerTitleStyle: {
        color:Colors.accent,
        alignSelf: Platform.OS==="ios"?null:"center",
        textAlign: Platform.OS==="ios"?null:"center",
        justifyContent: Platform.OS==="ios"?null:"center",
        flex: 1,
        fontFamily:"Pacifico",
        fontSize:27,
      },
      headerLeft: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          >
            <Icon
              containerStyle={{
                marginLeft: 15,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
              type="feather"
              size={30}
              color={Colors.accent}
              name={"align-left"}
            />
          </TouchableOpacity>
        );
      },
      headerRight: () => <View></View>,
    };
  };
  

 export const defaultStackHeaderOptions = (props) => {
    return {
      headerTitle: "The Circle",
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: Colors.accent,
      headerTitleStyle: {
        alignSelf: "center",
        textAlign: "center",
        justifyContent: "center",
        flex: 1,
        fontFamily: "Roboto",
        fontWeight: "bold",
      },
      headerLeft: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Icon
              containerStyle={{
                marginLeft: 15,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
              color={Colors.accent}
              type="feather"
              size={30}
              name="arrow-left"
            />
          </TouchableOpacity>
        );
      },
      headerRight: () => <View></View>,
    };
  };
  


export const chatHeaderOptions = (props) => {
    const user = props.route.params.user;
    return {
      headerTitle: user.name,
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: Colors.accent,
      headerTitleStyle: {
        justifyContent: "center",
        flex: 1,
        fontFamily: "Roboto",
        fontWeight: "bold",
      },
      headerLeft: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Icon
              containerStyle={{
                marginLeft: 15,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
              type="feather"
              size={30}
              color={Colors.accent}
              name="arrow-left"
            />
          </TouchableOpacity>
        );
      },
      headerRight: () => <View></View>,
    };
  };
  


  export const editScreenHeaderOption = (props) => {
    return {
      headerTitle: "The Circle",
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: Colors.accent,
      headerTitleStyle: {
        alignSelf: "center",
        textAlign: "center",
        justifyContent: "center",
        flex: 1,
        fontFamily: "Quicksand",
        fontWeight: "bold",
      },
      headerLeft: () => {
        return(<View></View>)
      },
    };
  };
  