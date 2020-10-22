import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Item, Input, Label ,Icon } from 'native-base';
import * as firebase from 'firebase';


export default function Splash() {


    return(
        <View style={{flex:1, fontSize: 50, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" color="#00000" />
            <Text>Loading....</Text>
        </View>
    )
} 