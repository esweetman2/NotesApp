import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, Dimensions, ActivityIndicator, SafeAreaView, TouchableWithoutFeedback, Keyboard,TouchableOpacity} from 'react-native';
import { Input, Item, Icon } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import SingleClient from './singleClient'
import * as firebase from 'firebase'; 
import 'firebase/firestore';
import { AuthContext } from '../util/context';


export default function CustomerList({ navigation }) {

    const [storingList, setStoringList] = useState(false)
    const [loading, setLoading] = useState(false)
    const [clientName, setClientName] = useState('')
    const [clientList, setClientList] = useState([])
    const [editMode, setEditMode] = useState(false) 
    const [editableName, setEditableName] = useState()
    const [editObject, setEditObject] = useState()
    const db = firebase.firestore()
    // const { userToken }  = useContext(AuthContext)
    const { clients, userToken } = useContext(AuthContext)
    // console.log(userToken)




    useEffect(() => {
        // console.log(clients)
        if(storingList === true){
            // console.log(clientList)
            addClientFirestore(userToken, clientList)
            console.log("firebase WRite")

        }else if(clients !== null){
            // console.log('first render')
            setClientList(clients)
        }else{
            setClientList([])
        }
        setLoading(false)
        setStoringList(false)
        // return(() => {
        //     setStoringList(false) 
        // })

    },[clientList])




    let declareEditMode = (key) => {
        setEditMode(editMode => !editMode)
        let selected = clientList.filter(item => item.key === key.toString())
        // console.log(selected)
        setEditObject(selected)
        setEditableName(selected[0].clientName)
    }

    let saveEdit = (client) => {
        console.log(client)
        let newList = clientList.map((item,index) => {
            if(item.key == client[0].key){
                item.name = editableName
                return item
            }else{
                return item
            }
        })
        setClientList(newList)
        setEditMode(editMode => !editMode)
        setStoringList(true)
        
    }



    let updateClientList = () => {
        // setId(id + 1)
        console.log(clientList.indexOf(clientList[clientList.length - 1]))
        let key;
        if(clientList !== []){
            key = clientList.indexOf(clientList[clientList.length - 1]) + 1
        }else{
            key = 0
        }
        console.log(key)
        setClientList(clientList => [...clientList, {key: key.toString() ,name: clientName}])
        setClientName('')
        setStoringList(true)
        setLoading(true)
    } 

    const addClientFirestore = (user, list) => {
        db.collection("users").doc(user).update({
            clients: list 
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error.message);
        });
    }
    
    const deleteClient = (key) => {
        // console.log(key.toString())
        setClientList(clientList => clientList.filter(item => item.key != key.toString()))
        setStoringList(true)
    }

    const renderItem = ({ item }) => { 
            // return <View style={styles.rowFront}>
        return <TouchableOpacity style={styles.rowFront} onPress={() => navigation.navigate("Single Client", {name: item.name}
                    )}>
                    <View style={{width:'100%',flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}} >
                        <Text style={{fontSize: 25, textTransform: "capitalize", color:'white'}}>{item.name}</Text>
                        <Icon type='AntDesign' name="right" style={{fontSize:16, color:'white'}} />
                    </View>
                </TouchableOpacity>
            // </View>
       

    };
 
      const renderHiddenItem = (data, rowMap) => (
            <View style={styles.rowBack}>
                <TouchableOpacity style={styles.editText} onPress={() => declareEditMode(data.item.key)}>
                    <View >
                        <View style={{justifyContent:'center', alignItems:'center', color:'white'}}>
                            <Icon type='AntDesign' name='edit' style={{fontSize:22, color:'black',padding:3}} />
                            <Text style={{fontSize: 12}}>EDIT</Text> 
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteClient(data.item.key)} style={styles.deleteText}>
                    <View >
                        <View style={{justifyContent:'space-evenly', alignItems:'center'}}>
                            <Icon type='AntDesign' name='delete' style={{fontSize:22, color:'white',padding:3}} />
                            <Text style={{color:'white', fontSize: 12}}>DELETE</Text> 
                        </View>
                    </View>  
                </TouchableOpacity>
            </View>

      )


    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex:1}}>
            <View style={styles.addContainer}>
                <Item style={styles.addClient} >
                    <Icon active type='AntDesign' name='adduser' style={{padding:5}}/> 
                    <Input style={styles.addClientInput} 
                        placeholder='Add Client'
                        placeholderTextColor='rgba(0,0,0, .3)'
                        onChangeText={text => setClientName(text)}
                        value={clientName}
                        scrollEnabled={true}
                    />
                </Item>
                { clientName !== ''  ?
                    <TouchableOpacity onPress={() => updateClientList()}  
                    style={{ borderRadius:50}}>
                        <Text type='AntDesign' name='pluscircleo' style={{paddingLeft:25, paddingRight:25, paddingTop:10, paddingBottom: 10}} >ADD</Text>
                    </TouchableOpacity>

                    :
                    <View style={{padding:5}}></View>
                }
            </View>
            {
                loading ?
                <ActivityIndicator size="small" color="black" />
                :
                <View></View>    
            }
            <View style={{flex:1}}>
                <SwipeListView
                    data={clientList}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    disableRightSwipe={true}
                    rightOpenValue={-150}
                    stopRightSwipe={-150}
                    // directionalDistanceChangeThreshold={0}
                    closeOnScroll={true}
                    closeOnRowPress={true}
                    friction={100}
                    previewRowKey={'0'}
                    
                />
            </View>
            

            <Modal
                animationType="slide"
                transparent={false}
                visible={editMode}
                
            >
                <SafeAreaView style={{flex:1, justifyContent:'flex-start' }}>
                    <Item style={styles.modalClient} >
                        <Input style={styles.modalInput} 
                            placeholder='Add Client'
                            placeholderTextColor='rgba(0,0,0, .3)'
                            onChangeText={text => setEditableName(text)}
                            value={ editableName }
                            scrollEnabled={true}
                        /> 
                    </Item>
                    <View style={{flexDirection:'row', justifyContent:"space-evenly",margin:20}}>
                        <TouchableOpacity onPress={() => saveEdit(editObject)} style={{backgroundColor:'lightblue'}}>
                            <Text type='AntDesign' name='pluscircleo' style={{paddingLeft:25, paddingRight:25, paddingTop:10, paddingBottom: 10}} >Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setEditMode(!editMode)} style={{backgroundColor:'lightblue'}}>
                            <Text type='AntDesign' name='pluscircleo' style={{paddingLeft:25, paddingRight:25, paddingTop:10, paddingBottom: 10}} >Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
        </TouchableWithoutFeedback>
    )
} 


const styles = StyleSheet.create({
    addContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        padding:10,
        width:Dimensions.get('window').width
    }, 
    addClient:{
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, .1)',
        height:35,
        borderRadius:50
    },
    addClientInput:{
        // width: '90%'
        
    },
    rowFront:{
        height:65,
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor: 'gray',
        justifyContent: 'flex-start',
        paddingLeft:20,
        paddingRight: 20,

    },
    rowBack:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'flex-end', 
        alignItems:'center', 
        height:'100%',

    },
    deleteText:{
        backgroundColor:"red",
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        textAlign:'center',
        width: 75
    },
    editText:{
        backgroundColor:"lightgray",
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        height:'100%',
        width: 75,
        // padding:50
    },
    modalClient:{
        marginTop:'10%',
        justifyContent:'center',
        padding:20,
        borderBottomWidth: 0
    },
    modalInput:{
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0, .2)'
    }
})