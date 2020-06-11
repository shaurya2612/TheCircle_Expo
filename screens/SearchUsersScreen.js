import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as searchActions from "../store/actions/search";
import { Text, Container, Content } from "native-base";
import { View, FlatList, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
import Center from "../components/Center";
import firebase from "firebase";
import ListAvatar from "../components/ListAvatar";

const SearchUsersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const users = useSelector((state) => state.search.users);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(searchActions.fetchAllUsers()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, setIsLoading]);

  if (!isLoading) {
    return (
      <Container>
        <Content>
          <FlatList data={users} renderItem={(itemData)=><ListAvatar {...props} user={itemData.item}/>}/>
        </Content>
      </Container>
    );
  } else {
    return (
      <Center>
        <ActivityIndicator size="large" color={Colors.primary} />
      </Center>
    );
  }
};
export default SearchUsersScreen;
