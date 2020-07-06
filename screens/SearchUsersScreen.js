import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as searchActions from "../store/actions/search";
import { Text, Container, Content } from "native-base";
import { View, FlatList, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
import Center from "../components/Center";
import firebase from "firebase";
import ListAvatar from "../components/ListAvatar";
import { Searchbar } from "react-native-paper";

const SearchUsersScreen = (props) => {
  const isLoading = useSelector(state=>state.search.loading);
  const users = useSelector((state) => state.search.users);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const fetchResults = () =>{
    dispatch(searchActions.fetchResults(searchText))
  }

  return (
    <Container>
      <Searchbar
        autoCapitalize="none"
        placeholder="Type a username here..."
        onChangeText={text=>setSearchText(text)}
        value={searchText}
        onBlur={fetchResults}
      />
      {isLoading ? (
        <Center>
          <ActivityIndicator size="large" color={Colors.primary} />
        </Center>
      ) : users.length == 0 ? (
        <Center>
          <Text>No results</Text>
        </Center>
      ) : (
        <Container>
        <Content>
          <FlatList
            data={users}
            renderItem={(itemData) => (
              <ListAvatar {...props} user={itemData.item} />
            )}
          />
        </Content>
      </Container> 
      )}
    </Container>
  );
};
export default SearchUsersScreen;


