import React, { useState, useEffect } from "react";
import { SafeAreaView, Button, Platform, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import LoadingScreen from "../screens/LoadingScreen";
import ChatListScreen from "../screens/ChatListScreen";
import ChatScreen from "../screens/ChatScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector, useDispatch } from "react-redux";
import * as AuthActions from "../store/actions/auth";
import firebase from "firebase";
import Colors from "../constants/Colors";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import SettingsScreen from "../screens/SettingsScreen";
import RequestListScreen from "../screens/RequestListScreen";
import SearchUsersScreen from "../screens/SearchUsersScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import * as Fire from "../Fire";
import AllPermisList from "../screens/AllPermisList";

const chatHeaderOptions = (props) => {
  const user = props.route.params.user
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



const defaultHeaderOptions = (props) => {
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

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );
};

const TempStack = createStackNavigator();
const PermiStack = createStackNavigator();

const TempNavigator = () => {
  return (
    <TempStack.Navigator screenOptions={{ headerShown: false }}>
      <TempStack.Screen name="ChatListScreen" component={ChatListScreen} />
      {/* <TempStack.Screen name="ChatScreen" component={ChatScreen} /> */}
    </TempStack.Navigator>
  );
};

const PermiNavigator = () => {
  return (
    <PermiStack.Navigator screenOptions={{ headerShown: false }}>
      <PermiStack.Screen name="ChatListScreen" component={ChatListScreen} />
      {/* <PermiStack.Screen name="ChatScreen" component={ChatScreen} /> */}
    </PermiStack.Navigator>
  );
};

const PermiAllPermisStack = createStackNavigator();

const PermiAllPermisStackNavigator = () => {
  return (
    <PermiAllPermisStack.Navigator screenOptions={{ headerShown: false }}>
      <PermiAllPermisStack.Screen name={"List"} component={AllPermisList} />
      {/* <PermiAllPermisStack.Screen name={'ChatScreen'} component={ChatScreen}/> */}
    </PermiAllPermisStack.Navigator>
  );
};

const PermiRequestsStack = createStackNavigator();

const PermiRequestsStackNavigator = () => {
  return (
    <PermiRequestsStack.Navigator screenOptions={{ headerShown: false }}>
      <PermiRequestsStack.Screen name={"List"} component={RequestListScreen} />
    </PermiRequestsStack.Navigator>
  );
};

const PermiBottomTab = createMaterialBottomTabNavigator();

const PermiBottomTabNavigator = () => {
  return (
    <PermiBottomTab.Navigator
      barStyle={{ backgroundColor: Colors.primary }}
      activeColor={Colors.accent}
    >
      <PermiBottomTab.Screen
        name={"Chats"}
        component={PermiNavigator}
        options={{
          tabBarIcon: () => <Icon name="comment-discussion" type="octicon" />,
        }}
      />
      <PermiBottomTab.Screen
        name={"Requests"}
        component={PermiRequestsStackNavigator}
        options={{
          tabBarIcon: () => <Icon name="user-plus" type="feather" size={20} />,
        }}
      />
      <PermiBottomTab.Screen
        name={"allPermis"}
        component={PermiAllPermisStackNavigator}
        options={{
          tabBarLabel: "All Permis",
          tabBarIcon: () => <Icon name="users" type="feather" size={20} />,
        }}
      />
    </PermiBottomTab.Navigator>
  );
};

const AppTab = createMaterialTopTabNavigator();

const AppTabNavigator = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.accent,
        inactiveTintColor: Colors.accent,
        labelStyle: { fontSize: 15, fontFamily: "Roboto" },
        indicatorStyle: { backgroundColor: Colors.accent },
        style: { backgroundColor: Colors.primary },
      }}
    >
      <AppTab.Screen name="Permis" component={PermiBottomTabNavigator} />
      <AppTab.Screen name="Temps" component={TempNavigator} />
    </AppTab.Navigator>
  );
};

const AppStack = createStackNavigator();
const AppStackNavigator = () => {
  return (
    <AppStack.Navigator screenOptions={defaultHeaderOptions}>
      <AppStack.Screen name="AppTab" component={AppTabNavigator} />
    </AppStack.Navigator>
  );
};

const SettingsStack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator screenOptions={defaultHeaderOptions}>
      <SettingsStack.Screen name={"Settings"} component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
};

const SearchUsersStack = createStackNavigator();
const SearchUsersStackNavigator = () => {
  return (
    <SearchUsersStack.Navigator screenOptions={defaultHeaderOptions}>
      <SearchUsersStack.Screen name={"Users"} component={SearchUsersScreen} />
    </SearchUsersStack.Navigator>
  );
};

// const UserProfileStack = createStackNavigator();
// const UserProfileStackNavigator = () =>{
//   return(<UserProfileStack.Navigator>
//     <UserProfileStack.Screen name={"UserProfileScreen"} component={UserProfileScreen} />
//   </UserProfileStack.Navigator>)
// }

const ChatScreenStack = createStackNavigator();
const ChatScreenStackNavigator = () => {
  return (
    <ChatScreenStack.Navigator screenOptions={chatHeaderOptions}>
      <ChatScreenStack.Screen name={"Chat"} component={ChatScreen}/>
    </ChatScreenStack.Navigator>
  );
};

const AppDrawer = createDrawerNavigator();

const AppDrawerNavigator = () => {
  return (
    <AppDrawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <AppDrawer.Screen name={"Home"} component={AppStackNavigator} />
      <AppDrawer.Screen name={"Settings"} component={SettingsNavigator} />
      <AppDrawer.Screen name={"Search"} component={SearchUsersStackNavigator} />
      <AppDrawer.Screen name={"UserProfile"} component={UserProfileScreen} />
      <AppDrawer.Screen
        name={"ChatScreen"}
        component={ChatScreenStackNavigator}
      />
    </AppDrawer.Navigator>
  );
};

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const checkIfLoggedIn = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(AuthActions.authenticate(user));
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    checkIfLoggedIn();
    setIsLoading(false);
  }, [checkIfLoggedIn]);

  if (isLoading) return <LoadingScreen />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        {user ? <AppDrawerNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigator;
