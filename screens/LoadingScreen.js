import React from 'react';
import Center from '../components/Center';
import { ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';

const LoadingScreen = props =>{
    return (
        <Center>
            <ActivityIndicator size='large' color ={Colors.primary} />
        </Center>
    )
}

export default LoadingScreen;