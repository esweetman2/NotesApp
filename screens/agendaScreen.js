import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ImageBackground, TouchableHighlight, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AuthContext } from '../util/context'
import * as firebase from 'firebase'; 
import 'firebase/firestore';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Icon } from 'native-base';

 
export default function AgendaScreen({ navigation, route }) {
    
    const { userToken, appointments }  = useContext(AuthContext)
    // const [email, setEmail] = useState(userToken.userToken); 
    // const [name, setName] = useState(null);
    const [save, setSave] = useState(false)
    const [ismounted, setismounted] = useState(true)
    const [items, setItems] = useState({})
    const [agendaData, setAgendaData] = useState(appointments)
    const db = firebase.firestore()
    
    
    let newApp = route.params
    // console.log(agendaData) 
    // console.log(items)

    useEffect(() => { 
      
      // console.log(agendaData) 
      // console.log(items)
      // console.log(appointments)
      // console.log(items)
      // console.log(agendaData)
      // setAgendaData(appointments)
      // setItems({...items, ...appointments})
      // setAgendaData(appointments)
      // const newApp = route.params 
      
      if(newApp !== undefined && !save){ 
        let newAppointment = Object.assign({}, newApp)
        let dateKey = newAppointment.date
        delete newAppointment.date;
        let newItem = items[dateKey] 
        newItem.push(newAppointment)
        setItems({...items, [dateKey]: newItem}) 
        setAgendaData({...agendaData, [dateKey]: newItem})
        setSave(true) 
      }

      if(save){
        console.log("running")
        // console.log(agendaData)
        addAppointmentsFirestore(userToken, agendaData)

        // loadItems()
        // setItems(prev => {return {...prev, ...agendaData}})
        
        setSave(false)  
      }
      return () =>{ 
          setismounted(false)
          route.params = undefined  
      }
    },[agendaData,newApp])

    const addAppointmentsFirestore = (email, agenda) => {
      db.collection("appointments").doc(email).update({
          appointments: agenda
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error.message);
      });
    }




    const timeToString = (time) => {
        const date = new Date(time); 
        return date.toISOString().split('T')[0];
      };


    const loadItems = (day) => {
          for (let i = -14; i < 40; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);
            if (!items[strTime]) {
              items[strTime] = [];
            }
          }
          
          setItems(prev => {return {...prev, ...agendaData}})
          // console.log(items)
      };

      const deleteAppointment = (item) => {

        let newAgenda = {...agendaData}
        Object.keys(newAgenda).forEach(i=> {
          // console.log(i, agendaData[i])
          let del = newAgenda[i].indexOf(item)
          // console.log(del) 
          if(del !== -1 && newAgenda[i].length === 1){

            console.log(i, item)
            setItems({...items, [i]: []})
            delete newAgenda[i]
            setSave(true)
            setAgendaData(newAgenda)

          } else if(del !== -1 && newAgenda[i].length > 1){

            newAgenda[i].splice(del, 1)
            setItems({...items, [i]: newAgenda[i]})
            setSave(true)
            setAgendaData(newAgenda)

          }
        });
      }

          const renderItem = (item) => {
            return (
              <TouchableOpacity style={{ backgroundColor: 'white',
              flex: 1,
              borderRadius: 5,
              padding: 10,
              marginRight: 10,
              marginTop: 17}}
              onLongPress={() => deleteAppointment(item)}
              >

                    <View
                      style={{
                        // flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      {/* <Text>{item}</Text> */}
                      <Text>{item.name}</Text>
                      <Text>{item.fromTime} - {item.toTime} </Text>
                    </View>
              </TouchableOpacity>
            );
          };

    return(
        <SafeAreaView style={{flex:1, fontSize: 50, justifyContent:'center', alignItems:'center'}}>
            {/* <Text>Hello, {name}</Text>
            <Text>{email}</Text>
            <Text>Home Screen</Text> */}
            <TouchableOpacity onPress={() => navigation.navigate("Appointment")} >
              <View style={{margin: 10,padding: 10, width: 300, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor:"darkblue", borderRadius: 7}}>
                <Text style={{color:'white'}}>Add appointment</Text>
                <Icon type="AntDesign" name="plus" style={{color:'white'}}/>
              </View>
            </TouchableOpacity>
            <Agenda
            style={{flex:1, width: '100%'}}
                // testID={testIDs.agenda.CONTAINER}
                items={items}
                loadItemsForMonth={loadItems}
                selected={new Date()}
                renderItem={renderItem}
                renderEmptyDate={() => {return ( <View /> );}}
                pastScrollRange={2}
                futureScrollRange={5}
                // maxDate={'2012-05-30'}
                // renderEmptyDate={this.renderEmptyDate.bind(this)} 
                // rowHasChanged={this.rowHasChanged.bind(this)}

            />
            {/* <TouchableHighlight onPress={() => handleSignOut()}>
                <Text>Log Out</Text>
            </TouchableHighlight> */}
        </SafeAreaView>
    )
} 