import React from "react";
import Center from "../components/Center";
import { Text } from "native-base";
import { View, StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
import Colors from "../constants/Colors";
import { Icon } from "react-native-elements";

const CurrentUserProfileScreen = (props) => {
  const user = props.route.params.user;
  return (
    <View style={styles.root}>
      <ActionButton buttonColor={Colors.primary}>
        <ActionButton.Item
          buttonColor={Colors.primary}
          onPress={() => {props.navigation.navigate("EditCurrentUserProfileScreen")}}
        >
          <Icon name="edit" type="feather" size={20} color={Colors.accent} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default CurrentUserProfileScreen;
