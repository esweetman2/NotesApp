import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ImageBackground, TouchableHighlight, SafeAreaView, TouchableOpacity } from 'react-native';
// import { Item, Input, Label ,Icon } from 'native-base';
import { AuthContext } from '../util/context'
import * as firebase from 'firebase'; 
import { Icon } from 'native-base';


export default function Home({ navigation, route }) {
    

    const [email, setEmail] = useState(null); 
    const [name, setName] = useState(null);
    const [ismounted, setismounted] = useState(true)
    // const random = useContext(AuthContext)
 

    const handleSignOut = () => {
        firebase.auth().signOut()
        .catch(function(error) {
            // An error happened. 
            alert(error.message) 
          });
    }

    useEffect(() => { 
          
        if(ismounted){
            let user = firebase.auth().currentUser;
            if(user){
                console.log('home page user')
                setName(user.displayName)  
                setEmail(user.email)
            }else{
                alert('No User Found')
            } 
        }
        return () =>{ 
            setismounted(false)
        }
    },[])

    return(
        <SafeAreaView style={{flex:1, fontSize: 50, justifyContent:'center', alignItems:'center'}}>
            <Text>Hello, {name}</Text>
            <Text>{email}</Text>
            <Text>Home Screen</Text>
            <TouchableHighlight onPress={() => handleSignOut()}>
                <Text>Log Out</Text>
            </TouchableHighlight>
        </SafeAreaView>
    )
} 