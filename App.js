import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, TouchableHighlight } from 'react-native';
import { Icon } from 'native-base';


import SignIn from './screens/signin';
import CreateAccount from './screens/createAccount';
import Home from './screens/home';
import CustomerList from './screens/customerList';
import SingleClient from './screens/singleClient';
import Contact from './screens/contact';

// import { Splash, SignIn, CreateAccount, Home } from './screens';
import AgendaScreen from './screens/agendaScreen';
import Splash from './screens/splash';
import * as firebase from 'firebase'; 
import 'firebase/firestore';
import { AuthContext, ClientListContext } from './util/context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddAppointment from './screens/addAppointment';
// import { Agenda } from 'react-native-calendars';


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore()

const HomeStack = createStackNavigator();
const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator>
    <HomeStack.Screen name='Home' component={Home} 
     options={{
      headerLeft: () => (
        <TouchableHighlight onPress={() => navigation.toggleDrawer()}>

          <Icon name='menu' style={{color:'black',paddingLeft:15, paddingRight:15,fontSize:40}} />
        </TouchableHighlight>
      ),
    }}
    />
  </HomeStack.Navigator>
)

const AgendaStack = createStackNavigator();
const AgendaStackScreen =  ({ navigation }) => (
  <AgendaStack.Navigator>
    <AgendaStack.Screen name="Agenda" component={AgendaScreen} 
       options={{
        headerLeft: () => (
          <TouchableHighlight onPress={() => navigation.toggleDrawer()}>

            <Icon name='menu' style={{color:'black',paddingLeft:15, paddingRight:15,fontSize:40}} />
          </TouchableHighlight>
        ),
      }}
    /> 
    <AgendaStack.Screen name="Appointment" component={AddAppointment}
       options={{
        headerLeft: () => (
          <TouchableHighlight onPress={() => navigation.toggleDrawer()}>

            <Icon name='menu' style={{color:'black',paddingLeft:15, paddingRight:15,fontSize:40}} />
          </TouchableHighlight>
        ),
      }}
    />
  </AgendaStack.Navigator>
);
const ClientStack = createBottomTabNavigator();
const ClientTabScreen = () => (
  <ClientStack.Navigator tabBarOptions={{ 
    showIcon: true,
    activeTintColor: 'blue',
    inactiveTintColor:'lightgray'
  }}
  
  >
    <ClientStack.Screen name="Single"component={SingleClient} 
      options={{
        title: "Notes",
        tabBarIcon: ({ focused }) => (
          focused 
          ?
          <Icon type="AntDesign" name="profile" style={{color:'blue',fontSize:25}}/>
          :
          <Icon type="AntDesign" name="profile" style={{color:'lightgray', fontSize:25}}/>
          ),
      }}
    />
    <ClientStack.Screen name="Contact" component={Contact} 
    options={{
      title:"Contact",
      tabBarIcon: ({focused} ) => (
         focused
          ?
          <Icon type="AntDesign" name="contacts" style={{color:'blue', fontSize:25}} />
          :
          <Icon type="AntDesign" name="contacts" style={{color:'lightgray', fontSize:25}}/>
      ),
    }}
    />
  </ClientStack.Navigator>
)

const CustomerStack = createStackNavigator();
const CustomerStackScreen = ({ navigation }) => (
  <CustomerStack.Navigator>
    <CustomerStack.Screen name="Clients" component={CustomerList} 
      options={{
        headerLeft: () => (
          <TouchableHighlight onPress={() => navigation.toggleDrawer()}>
            <Icon name='menu' style={{color:'black',paddingLeft:15, paddingRight:15,fontSize:40}} />
          </TouchableHighlight>
        ),
      }}
    />
    <CustomerStack.Screen name="Single Client" component={ClientTabScreen} options={({ route }) => ({ title: route.params.name })}/>
  </CustomerStack.Navigator>
); 


const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen 
      name="SignIn"
      component={SignIn}
      options={{ 
        headerShown: false 
      }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{
        headerShown: false,
      }}
    />
  </AuthStack.Navigator>
);

const DrawerStack = createDrawerNavigator();
const DrawerStackScreen = () => (
  <DrawerStack.Navigator initialRouteName="Agenda">
    <DrawerStack.Screen  name="Home" component={HomeStackScreen} />
    <DrawerStack.Screen  name="Agenda" component={AgendaStackScreen} />
    <DrawerStack.Screen  name="Customers" component={CustomerStackScreen} />
  </DrawerStack.Navigator>
)

export default function App({ navigation }) {

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [clients, setClients] = useState(null)
  const [appointments, setAppointments] = useState(null)
  const [ismounted, setismounted] = useState(true);


  useEffect( () => {
    if(ismounted){

      authContext.authStatus()
    }
        
    return () =>{
      setismounted(false)
    } 
  }, []) 

  const authContext = {
    authStatus: () => { 
      // console.log('sign in')
      firebase.auth().onAuthStateChanged(function(user) {
        if (user !== null && user.displayName !== null) { 
          // User is signed in.
          // console.log(user.uid)
          setUserToken(user.email)
          authContext.clientsDB(user.email)
          authContext.appointmentsDB(user.email)
          // setIsLoading(false)
        } else { 
          // console.log('again sign in')
          // return <Splash />
          setIsLoading(false)
          setUserToken(null)
        }
      })
    },
    userToken: userToken,
    ran: "random",
    clientsDB: (email) => {
      db.collection("users").doc(email).get().then(function(doc) {
        if (doc.exists) {
          setClients(doc.data().clients)
          // setIsLoading(false)
            // console.log("Document data:", doc.data().clients); 
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    },
    clients: clients,
    appointmentsDB : (email) => {
      db.collection("appointments").doc(email).get().then(function(doc) {
        if (doc.exists) {
          setAppointments(doc.data().appointments)
          // console.log(doc.data().appointments)
          setIsLoading(false)
            // console.log("Document data:", doc.data().appointments);  
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    },
    appointments: appointments
  }   




  if(isLoading === true ){
    return <Splash />
  }

  return (
    <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          { (userToken && appointments !== null && clients !== null) ?   
            <DrawerStackScreen />
            :
            <AuthStackScreen />
          }
        </NavigationContainer>
      </AuthContext.Provider>
  ); 
}

