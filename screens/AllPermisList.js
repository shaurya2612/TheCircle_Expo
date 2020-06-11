import React, { useState, useEffect, useCallback } from "react";
import { Button, FlatList, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "native-base";
import * as permiActions from "../store/actions/permis";
import Center from "../components/Center";
import Colors from "../constants/Colors";
import ChatListAvatar from "../components/ChatListAvatar";
import { Container, Content } from "native-base";

const AllPermisList = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const permis = useSelector((state) => state.permis.permis);

  const fetchPermis = async () => {
    dispatch(permiActions.fetchPermis());
  };

  useEffect(() => {
    setIsLoading(true);
    fetchPermis().then(() => {
      setIsLoading(false);
    });
  }, [setIsLoading]);

  if (isLoading) {
    return (
      <Center>
        <ActivityIndicator size="large" color={Colors.primary} />
      </Center>
    );
  }

  return (
    <FlatList
      data={permis}
      renderItem={(itemData) => (
        <ChatListAvatar {...props} user={itemData.item} />
      )}
    />
  );
};

export default AllPermisList;
