import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ImageBackground } from 'react-native';
import {  Form, Item, Input, Label ,Icon } from 'native-base';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { AuthContext } from '../util/context'
import CreateAccount from './createAccount';
import * as firebase from 'firebase'; 




export default function SignIn({ navigation }) {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

//   const { signIn } = React.useContext(AuthContext);
    const { authStatus } = useContext(AuthContext);

  const handleSignIn = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
        // signIn()
        authStatus()
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        setErrorMessage(error.message)
        if(errorMessage) {
            setTimeout(() => {
                setErrorMessage(null) 
            }, 3000)
        }
        // ...
      });

  }

    return (
        <ImageBackground source={require('../images/dark-background.jpg')} style={styles.imageBackground}>
            <KeyboardAvoidingView 
                // keyboardVerticalOffset={0} 
                // behavior={Platform.OS == "ios" ? "padding" : "height"}
                behavior='padding' 
                style={styles.keyboardContainer}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.container} >
                        <View style={styles.innerContainer}>
                            <Text style={styles.headerText}>Keep Note</Text>
                        </View>
                        <View style={styles.form}>
                        <Text style={{color:'white', textAlign:'center'}} > {errorMessage} </Text>
                            <Item floatingLabel style={styles.formItem}>
                                <Icon name='mail' style={{color:'lightgray'}} />
                                <Label style={styles.formLable}>Email</Label> 
                                <Input style={{color:'white'}} 
                                onChangeText={(text) => setEmail(text.toLowerCase())}
                                value={email}
                                
                                />
                            </Item>
                            <Item floatingLabel style={styles.formItem} >
                                <Icon name='lock' style={{color:'lightgray'}} />
                                <Label style={styles.formLable}>Password</Label>  
                                <Input style={{color:'white'}} secureTextEntry={true}
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                                />
                            </Item>
                            <TouchableOpacity style={{marginTop:'5%'}} onPress={handleSignIn}>
                                <View style={styles.loginContainer}>
                                    <Text style={styles.loginText}>Login</Text>
                                </View>
                            </TouchableOpacity >
                            <TouchableOpacity style={{marginTop:'3%'}} onPress={() => navigation.navigate(CreateAccount)}>
                                <View style={styles.signupContainer}>
                                    <Text style={styles.signupText}>Sign Up</Text>
                                </View>
                            </TouchableOpacity> 
                        </View>
                    </View>        
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,.4)',
        padding:20,
        zIndex: 2
    },
    keyboardContainer:{
        flex:1,
        width:'100%',
        justifyContent: 'center',
        alignItems:'center',

    },
    imageBackground:{
        flex: 1,
        width: '100%',
        height:'100%',
        zIndex: -2,
    },
    innerContainer:{
        flex:1,
        width:'100%',  
        justifyContent:'center',
        
    },
    headerText:{
        fontSize:30,
        color:'white',
        textAlign:'center'
    },
    form:{
        flex:2,
        width:'100%',
        justifyContent:'center',
        color:'white'
    },
    formItem:{
        margin:'2%',
        width:'100%',
    },
    formLable:{
        color:'lightgray'
    },
    signupContainer:{
        backgroundColor:'darkgray',
        paddingTop:15,
        paddingBottom: 15,
        borderRadius: 6,
    },
    signupText:{
        color:'black',
        fontSize: 18,
        textAlign:'center',
        width: '100%'
    },
    loginContainer:{
      backgroundColor:'#3200B8',
      paddingTop:15,
      paddingBottom: 15,
      borderRadius: 6,
      marginTop:'5%'

  },
  loginText:{
      color:'white',
      fontSize: 18,
      textAlign:'center',
      width: '100%'
  }

})