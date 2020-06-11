import React, { useEffect, useState, useCallback } from "react";
import {View} from 'react-native'
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
} from "native-base";
import firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";
import { ActivityIndicator, FlatList, Text } from "react-native";
import Colors from "../constants/Colors";
import Center from "../components/Center";
import * as requestsActions from "../store/actions/requests";
import ListAvatar from "../components/ListAvatar";

const RequestList = (props) => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests.requests);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async()=>{ dispatch(requestsActions.fetchRequests());}

  useEffect(()=>{
    setIsLoading(true);
    fetchRequests().then(()=>{
      setIsLoading(false);
    })
  },[setIsLoading])
  
  console.log(requests);
  
  if (isLoading) {
    return (
      <Center>
        <ActivityIndicator size="large" color={Colors.primary} />
      </Center>
    );
  }

  if(requests.length==0){
    return <Center><Text>No Requests yet!</Text></Center>
  } 

  return (
    <Container>
        <Content>
          <FlatList data={requests} renderItem={(itemData)=><ListAvatar {...props} user={itemData.item} requestButton/>}/>
        </Content>
      </Container>
  );
};

export default RequestList;
