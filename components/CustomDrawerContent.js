import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as AuthActions from "../store/actions/auth";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as tempStorageActions from "../store/actions/tempStorage";
import firebase from "firebase";
import Colors from "../constants/Colors";

const CustomDrawerContent = (props) => {
  const user = useSelector((state) => state.tempStorage.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const onPressHandler = async () => {
    props.navigation.navigate("Settings");
  };
  const dispatch = useDispatch();
  const fetchUserData = () => {
    dispatch(tempStorageActions.fetchCurrentUserData());
  };

  useEffect(() => {
    fetchUserData();
    setIsLoading(false);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor:Colors.darkbg }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View syle={styles.userInfoSection}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("CurrentUserProfile",{
                  screen:"CurrentUserProfileScreen",
                  params:{user: { id: firebase.auth().currentUser.uid, ...user }},
                });    
              }}
            >
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Image
                  style={{ marginLeft: 10, backgroundColor:Colors.accent }}
                  source={{
                    uri: isLoading
                      ? "https://wallpaperplay.com/walls/full/2/c/2/58072.jpg"
                      : user.displayPicture,
                  }}
                  size={50}
                />
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <Title style={styles.title}>
                    {isLoading ? " " : user.name}
                  </Title>
                  <Caption style={styles.caption}>{`@${
                    isLoading ? " " : user.username
                  }`}</Caption>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="home-outline" color={Colors.accent}  size={28} />
            )}
            labelStyle={{color:Colors.accent, fontFamily:"Quicksand"}}
            label="Home"
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="account" color={Colors.accent} size={28} />
            )}
            labelStyle={{color:Colors.accent, fontFamily:"Quicksand"}}
            label="Permis"
            onPress={() => {
              props.navigation.navigate("Permis");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="account-search" color={Colors.accent} size={28} />
            )}
            labelStyle={{color:Colors.accent, fontFamily:"Quicksand"}}
            label="Search People"
            onPress={() => {
              props.navigation.navigate("Search");
            }}
          />
          
        </Drawer.Section>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="settings-outline" color={Colors.accent} size={28} />
          )}
          labelStyle={{color:Colors.accent, fontFamily:"Quicksand"}}
          label="Settings"
          onPress={onPressHandler}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor:Colors.darkbg
  },
  userInfoSection: {
    backgroundColor:Colors.darkbg,
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
    color:Colors.accent
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color:Colors.accent
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    backgroundColor:Colors.darkbg,
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default CustomDrawerContent;
