import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ImageBackground, TouchableHighlight, ActivityIndicator} from 'react-native';
import { Item, Input, Label ,Icon, Button } from 'native-base';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AuthContext } from '../util/context';


export default function CreateAccount({ navigation }) {

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('')
    const [ismounted, setismounted] = useState(true)
    const db = firebase.firestore()
    const { authStatus} = useContext(AuthContext);

    useEffect( () => {

        return () =>{
          setismounted(false)
        }
      },[] )
      const addAppointmentFB = (email) => {
            db.collection('appointments').doc(email).set({
                appointments: {}
            })
            .then(function() {
            console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
      }
    
    const addToFirestore = (email, user, name) => {
      db.collection("users").doc(email).set({
          name: name,
          id: user,
          email: email,
          clients: []
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error.message);
      });
    }

    const handleSignup = (name, email, password) => {

        if(ismounted){
            setLoading(true)
           firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                let user = firebase.auth().currentUser;
                    if (user) {
                    addToFirestore(email, user.uid, name)
                    addAppointmentFB(email)
            
                    return user.updateProfile({
                        displayName: name,
                    })
                    
                    } else {
                    // No user is signed in.
                    }
                    setSuccessMessage('You have been signed up!')
                    setErrorMessage('')
            })
            .then(() => {
                // signIn()
                authStatus()
                setName('')
                setEmail('')
                setPassword('')
                Keyboard.dismiss()
            })
            .catch(function(error) {
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                setErrorMessage("* " + error.message)
                // ...
            });
            }
    }

const setCredentials = () => {
        if(email === "" || name === "" || password === ""){
            setErrorMessage('* Please fill out')
        }else{
            handleSignup(name, email, password)
        }
    }

    return (
        
        <ImageBackground source={require('../images/dark-background.jpg')} style={styles.imageBackground}>
            <KeyboardAvoidingView 
            //    keyboardVerticalOffset={70} 
            //     behavior={Platform.OS == "ios" ? "padding" : "height"}
                behavior='position' 
                style={styles.keyboardContainer} 
            >
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <SafeAreaView style={styles.safeAreaContainer}>
                            <View style={styles.container}>
                                <View style={styles.innerContainer}>
                                    <Text style={styles.headerText}>Sign up to get started</Text>
                                </View>
                                <View style={styles.form}>
                                    {loading ?
                                    <ActivityIndicator size="small" color="white" />
                                    :
                                    <View></View>    
                                    }
                                    <Text style={styles.errorText}>{errorMessage}</Text>
                                    <Text style={styles.successText}>{successMessage}</Text>
                                    <Item floatingLabel style={styles.formItem}>
                                        {/* <Icon name='person' style={{color:'lightgray'}}/>  */}
                                        <Label style={styles.formLable}>Name</Label> 
                                        <Input  style={{color:'white'}}
                                            onChangeText={text => setName(text)}
                                            value={name}
                                        />
                                    </Item>
                                    <Item floatingLabel style={styles.formItem}>
                                        {/* <Icon name='mail' style={{color:'lightgray'}} /> */}
                                        <Label style={styles.formLable}>Email</Label> 
                                        <Input style={{color:'white'}} 
                                            onChangeText={text => setEmail(text.toLowerCase())}
                                            value={email}
                                        />
                                    </Item>
                                    <Item floatingLabel style={styles.formItem} >
                                        {/* <Icon name='lock' style={{color:'lightgray',}} /> */}
                                        <Label style={styles.formLable}>Password</Label>  
                                        <Input style={{color:'white'}} secureTextEntry={true} 
                                            onChangeText={text => setPassword(text)}
                                            value={password}
                                        />
                                    </Item>
                                    
                                    <TouchableHighlight
                                    style={{marginTop:'5%'}}
                                    onPress={setCredentials}
                                    >
                                        <View style={styles.signupContainer}>
                                            <Text style={styles.signupText}>Sign Up</Text>
                                        </View>
                                    </TouchableHighlight> 
                                    <TouchableHighlight onPress={() => navigation.navigate('SignIn')} >
                                        <View style={styles.backLoginContainer}>
                                            <Text style={styles.backText}>Back to login</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View> 
                        </SafeAreaView>    
                    </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    safeAreaContainer:{
        flex:1,
        backgroundColor:'rgba(0,0,0,.9)',
        width:Dimensions.get('window').width
    },
    container:{
        flex:1,
        // width:'100%',
        // height:'100%',
        justifyContent: 'center',
        alignItems:'center',
        padding:20,

    },
    keyboardContainer:{
        flex:1,
        width:'100%',
        justifyContent: 'center',
        alignItems:'center',
    },
    imageBackground:{
        flex: 1,
        // width: '100%',
        // height:'100%',
        zIndex: -2,
    },
    innerContainer:{
        flex:1,
        width:'100%',  
        justifyContent:'center',
        alignItems:'center'
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
    },
    formItem:{
        margin:'2%',
        width:'100%',
        padding:3,
    },
    formLable:{
        color:'lightgray'
    },
    signupContainer:{
        backgroundColor: '#47BFFF',
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
    backText:{
        color:'white',
        fontSize: 16,
        textAlign:'center',
        width: '100%'
    },
    backLoginContainer:{
        backgroundColor:'transparent',
        paddingTop:15,
        paddingBottom: 15,
        marginTop:'5%'
    },
    errorText:{
        textAlign:'center',
        color:'lightgray',
        marginBottom:-10,
        fontSize:16
    },
    successText:{
        textAlign:'center',
        color:'white',
        marginBottom:-10,
        fontSize:18
    }
})