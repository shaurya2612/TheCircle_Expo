import React, { useState, useEffect } from "react";
import { SafeAreaView, Button, Platform, View } from "react-native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
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
import AllPermisList from "../screens/AllPermisList";
import PhoneAuthScreen from "../screens/PhoneAuthScreen";

import CurrentUserProfileScreen from "../screens/CurrentUserProfileScreen";
import EditCurrentUserProfileScreen from "../screens/EditCurrentUserProfileScreen";
import {
  defaultHeaderOptions,
  chatHeaderOptions,
  defaultStackHeaderOptions,
  editScreenHeaderOption,
  defaultIOSHeaderOptions,
  CurrentUserProfileScreenHeaderOptions
} from "./HeaderOptions";
import TempRoom from "../screens/TempMatching/TempRoom";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddCardScreen from "../screens/AddCardScreen";

const AuthStack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="PhoneAuth" component={PhoneAuthScreen} />
      <AuthStack.Screen name="Signup" component={Signup} />
      {/* <AuthStack.Screen name="SignupPhotos" component={SignupPhotos} /> */}
    </AuthStack.Navigator>
  );
};

const MatchingStack = createStackNavigator();
const MatchingStackNavigator = () => {
  return (
    <MatchingStack.Navigator>
      <MatchingStack.Screen
        name="TempRoom"
        component={TempRoom}
      />
    </MatchingStack.Navigator>
  );
};

const TempBottomTab =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialBottomTabNavigator();
const TempBottomTabNavigator = () => {
  return (
    <TempBottomTab.Navigator
      tabBarOptions={
        Platform.OS === "ios"
          ? {
              tabStyle: { backgroundColor: Colors.primary },
              activeTintColor: Colors.accent,
              labelStyle: { fontSize: 12 },
            }
          : null
      }
      style={Platform.OS === "ios" ? { marginBottom: 20 } : null}
      barStyle={{ backgroundColor: Colors.primary }}
      activeColor={Colors.accent}
    >
      <TempBottomTab.Screen
        name="Temps"
        component={MatchingStackNavigator}
        options={{
          tabBarIcon: () => (
            <Icon
              containerStyle={Platform.OS === "ios" ? { marginTop: 6 } : null}
              name="target"
              type="feather"
              color={Colors.accent}
            />
          ),
        }}
      />
      <TempBottomTab.Screen
        name="Matches"
        component={MatchesStackNavigator}
        options={{
          tabBarIcon: () => (
            <Icon
              containerStyle={Platform.OS === "ios" ? { marginTop: 6 } : null}
              name="message-circle"
              type="feather"
              color={Colors.accent}
            />
          ),
        }}
      />
    </TempBottomTab.Navigator>
  );
};

const PermiStack = createStackNavigator();

const PermiChatsStackNavigator = () => {
  return (
    <PermiStack.Navigator
      screenOptions={
        Platform.OS === "ios" ? defaultIOSHeaderOptions : defaultHeaderOptions
      }
    >
      <PermiStack.Screen name="ChatListScreen" component={ChatListScreen} />
      {/* <PermiStack.Screen name="ChatScreen" component={ChatScreen} /> */}
    </PermiStack.Navigator>
  );
};

const PermiAllPermisStack = createStackNavigator();

const PermiAllPermisStackNavigator = () => {
  return (
    <PermiAllPermisStack.Navigator
      screenOptions={
        Platform.OS === "ios" ? defaultIOSHeaderOptions : defaultHeaderOptions
      }
    >
      <PermiAllPermisStack.Screen name={"List"} component={AllPermisList} />
      {/* <PermiAllPermisStack.Screen name={'ChatScreen'} component={ChatScreen}/> */}
    </PermiAllPermisStack.Navigator>
  );
};

const PermiRequestsStack = createStackNavigator();

const PermiRequestsStackNavigator = () => {
  return (
    <PermiRequestsStack.Navigator
      screenOptions={
        Platform.OS === "ios" ? defaultIOSHeaderOptions : defaultHeaderOptions
      }
    >
      <PermiRequestsStack.Screen name={"List"} component={RequestListScreen} />
    </PermiRequestsStack.Navigator>
  );
};

const PermiBottomTab =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialBottomTabNavigator();

const PermiBottomTabNavigator = () => {
  return (
    <PermiBottomTab.Navigator
      tabBarOptions={
        Platform.OS === "ios"
          ? {
              tabStyle: { backgroundColor: Colors.primary },
              activeTintColor: Colors.accent,
              labelStyle: { fontSize: 12 },
            }
          : null
      }
      barStyle={{ backgroundColor: Colors.primary }}
      activeColor={Colors.accent}
    >
      <PermiBottomTab.Screen
        name={"allPermis"}
        component={PermiAllPermisStackNavigator}
        options={{
          tabBarLabel: "All Permis",
          tabBarIcon: () => (
            <Icon
              containerStyle={Platform.OS === "ios" ? { marginTop: 6 } : null}
              name="users"
              type="feather"
              size={20}
              color={Colors.accent}
            />
          ),
        }}
      />
      <PermiBottomTab.Screen
        name={"Requests"}
        component={PermiRequestsStackNavigator}
        options={{
          tabBarIcon: () => (
            <Icon
              containerStyle={Platform.OS === "ios" ? { marginTop: 6 } : null}
              name="user-plus"
              type="feather"
              size={20}
              color={Colors.accent}
            />
          ),
        }}
      />
    </PermiBottomTab.Navigator>
  );
};

const ChatScreenStack = createStackNavigator();
const ChatScreenStackNavigator = () => {
  return (
    <ChatScreenStack.Navigator screenOptions={chatHeaderOptions}>
      <ChatScreenStack.Screen name={"Chat"} component={ChatScreen} />
    </ChatScreenStack.Navigator>
  );
};
// const AppTab = createMaterialTopTabNavigator();

// const AppTabNavigator = () => {
//   return (
//     <AppTab.Navigator
//       tabBarOptions={{
//         activeTintColor: Colors.accent,
//         inactiveTintColor: Colors.accent,
//         labelStyle: { fontSize: 15, fontFamily: "Roboto" },
//         indicatorStyle: { backgroundColor: Colors.accent },
//         style: { backgroundColor: Colors.primary },
//       }}
//     >
//       <AppTab.Screen name="Permis" component={PermiBottomTabNavigator} />
//       <AppTab.Screen name="Temps" component={TempNavigator} />
//     </AppTab.Navigator>
//   );
// };

const AppStack = createStackNavigator();
const AppStackNavigator = () => {
  return (
    <AppStack.Navigator
      screenOptions={
        Platform.OS === "ios" ? defaultIOSHeaderOptions : defaultHeaderOptions
      }
    >
      <AppStack.Screen
        name="TempBottomTabNavigator"
        component={TempBottomTabNavigator}
      />
    </AppStack.Navigator>
  );
};

const SettingsStack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={
        Platform.OS === "ios" ? defaultIOSHeaderOptions : defaultHeaderOptions
      }
    >
      <SettingsStack.Screen name={"Settings"} component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
};

const SearchUsersStack = createStackNavigator();
const SearchUsersStackNavigator = () => {
  return (
    <SearchUsersStack.Navigator
      screenOptions={
        Platform.OS === "ios" ? defaultIOSHeaderOptions : defaultHeaderOptions
      }
    >
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

const MatchScreenStack = createStackNavigator();
const MatchesStackNavigator = () => {
  return (
    <MatchScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <MatchScreenStack.Screen name={"ChatList"} component={ChatListScreen} />
    </MatchScreenStack.Navigator>
  );
};

const CurrentUserProfileStack = createStackNavigator();
const CurrentUserProfileStackNavigator = () => {
  return (
    <CurrentUserProfileStack.Navigator>
      <CurrentUserProfileStack.Screen
        name={"CurrentUserProfileScreen"}
        component={CurrentUserProfileScreen}
        options={
          CurrentUserProfileScreenHeaderOptions
        }
      />
      <CurrentUserProfileStack.Screen
        name={"EditCurrentUserProfileScreen"}
        component={EditCurrentUserProfileScreen}
        options={editScreenHeaderOption}
      />
      <CurrentUserProfileStack.Screen
      name={"AddCardScreen"}
      component={AddCardScreen}
      options={defaultStackHeaderOptions}
      />
    </CurrentUserProfileStack.Navigator>
  );
};

const UserProfileStack = createStackNavigator();
const UserProfileStackNavigator = () => {
  return (
    <UserProfileStack.Navigator>
      <UserProfileStack.Screen
        name={"UserProfileScreen"}
        component={UserProfileScreen}
        options={defaultStackHeaderOptions}
      />
    </UserProfileStack.Navigator>
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
      <AppDrawer.Screen
        name={"UserProfile"}
        component={UserProfileStackNavigator}
      />
      <AppDrawer.Screen
        name={"CurrentUserProfile"}
        component={CurrentUserProfileStackNavigator}
      />
      <AppDrawer.Screen
        name={"ChatScreen"}
        component={ChatScreenStackNavigator}
      />
      <AppDrawer.Screen name={"Permis"} component={PermiBottomTabNavigator} />
    </AppDrawer.Navigator>
  );
};

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
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
