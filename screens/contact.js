import React, { useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Dimensions, Modal,KeyboardAvoidingView,Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Icon, Item, Input } from 'native-base'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Contact() {
    
    // const [email, setEmail] = useState('')
    // const [phone, setPhone] = useState('')
    // const [address, setAddress] = useState('')
    const [contactInfo, setContactInfo] = useState({})
    const [editMode, setEditMode] = useState(false)


    // console.log(contactInfo)
    const saveContact = () => {
        console.log(contactInfo);
        setEditMode(!editMode) 
    }




    return(
        <View style={{flex:1, fontSize: 50, justifyContent:'flex-start', alignItems:'center' ,backgroundColor:'white'}}>
            {/* <Text style={styles.header}>Contact Information</Text> */}
            <View style={styles.container}>
                <View style ={styles.row}>
                    <Icon type='AntDesign' name="user" style={styles.icon} />
                    <Text style={styles.iconText}>{contactInfo.name ? contactInfo.name : ""} </Text>
                </View>
                <View style ={styles.row}>
                    <Icon type='AntDesign' name="mail" style={styles.icon} />
                    <Text style={styles.iconText}>{contactInfo.name ? contactInfo.email : ""} </Text>
                </View>
                <View style ={styles.row}>
                    <Icon type='AntDesign' name="phone" style={styles.icon} />
                    <Text style={styles.iconText}>{contactInfo.name ? contactInfo.phone : ""} </Text>
                </View>
                <View style ={styles.row}>
                    <Icon type='FontAwesome' name="address-card-o" style={styles.icon} />
                    <Text style={styles.iconText}>{contactInfo.name ? contactInfo.address : ""} </Text> 
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}} >
                    <TouchableOpacity
                    style={styles.modalBtn}
                    onPress={() => setEditMode(!editMode)}
                    >
                        <View style={styles.btn}>
                            <Text style={styles.updateText}>Update</Text>
                            {/* <Icon type='AntDesign' name="plus" style={{color:'white'}} /> */}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={editMode}
            >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
                >
                    <SafeAreaView style={{paddingTop: 50}}>
                        <View>
                            <Item>
                                <Icon type='AntDesign' name="user"  />
                                <Input placeholder='Name...' placeholderTextColor='rgba(0,0,0,.3)'
                                    onChangeText={(text) => setContactInfo({...contactInfo, name: text })}
                                    value={contactInfo.name}
                                />
                            </Item>
                            <Item>
                                <Icon type='AntDesign' name="mail" />
                                <Input placeholder='Email...' placeholderTextColor='rgba(0,0,0,.3)'
                                onChangeText={(text) => setContactInfo({...contactInfo, email: text.toLowerCase()})}
                                value={contactInfo.email}
                                keyboardType='email-address'
                                />
                            </Item>
                            <Item>
                                <Icon type='AntDesign' name="phone" />
                                <Input placeholder='Phone...' placeholderTextColor='rgba(0,0,0,.3)'
                                onChangeText={(text) => setContactInfo({...contactInfo, phone: text})}
                                value={contactInfo.phone}
                                keyboardType='phone-pad'
                                />
                            </Item>
                            <Item>
                                <Icon type='FontAwesome' name="address-card-o" />
                                <Input placeholder='Address...' placeholderTextColor='rgba(0,0,0,.3)' 
                                onChangeText={(text) => setContactInfo({...contactInfo, address: text})}
                                value={contactInfo.address}
                                />
                            </Item>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                            <TouchableOpacity
                            style={styles.saveBtn}
                            onPress={() => saveContact()}
                            >
                                <View style={styles.btn}>
                                    <Text style={styles.saveText}>Save</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={styles.closeBtn}
                            onPress={() => setEditMode(!editMode)}
                            >
                                <View style={styles.btn}>
                                    <Text style={styles.closeText}>Close</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        width: "100%",
        paddingTop:25,
        paddingLeft:10,
        paddingRight: 10

    },
    header:{
        fontSize: 25,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 25,
        
    },
    icon:{
        flex:1,
        fontSize:25,
    },
    iconText:{
        flex:3,
        textAlign:'left',
        fontSize: 20
    },
    modalBtn:{
        backgroundColor:'blue',
        marginTop: 25,
        borderRadius: 50,
        width: Dimensions.get('window').width * 1/1.3 
    },
    btn:{
        padding: 10,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',

    },
    updateText:{
        color:'white',
        fontSize: 20
    },
    saveBtn:{
        backgroundColor:'blue',
        marginTop: 25,
        borderRadius: 50,
        width:Dimensions.get('window').width * 1.8/3
    },
    closeBtn:{

        backgroundColor:'lightgray',
        marginTop: 25,
        borderRadius: 50
    },
    saveText:{
        color:'white',
        fontSize: 20
    },
    closeText:{
        color:'black',
        fontSize: 20
    }
})