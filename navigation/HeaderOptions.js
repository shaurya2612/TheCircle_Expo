import React from 'react';
import { TouchableOpacity, View} from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';



export const defaultHeaderOptions = (props) => {
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
              type="ionicon"
              size={30}
              name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
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
      headerStyle: { backgroundColor: Colors.accent },
      headerTintColor: Colors.primary,
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
        fontFamily: "Roboto",
        fontWeight: "bold",
      },
      headerLeft: () => {
        return(<View></View>)
      },
    };
  };
  