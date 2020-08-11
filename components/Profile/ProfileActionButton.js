import React from 'react';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';

const ProfileActionButton = (props) => (
    <ActionButton buttonColor={Colors.gradient}>
        <ActionButton.Item
          buttonColor={Colors.gradient}
          onPress={() => {
            props.navigation.navigate("EditCurrentUserProfileScreen", {
              profileData : props.profileData 
            });
          }}
        >
          <Icon name="edit" type="feather" size={20} color={Colors.accent} />
        </ActionButton.Item>
      </ActionButton>
);

export default ProfileActionButton;