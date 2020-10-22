import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Modal, SafeAreaView, ScrollView } from 'react-native';
import { Container, Accordion, Icon, Content, Item, Input, Textarea } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { set } from 'react-native-reanimated';


export default function SingleClient({ navigation }) {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [modalVisible, setModalVisible] = useState(false)
    const [visits, setVisits] = useState([])
    const [header, setHeader] = useState('')
    const [content, setContent] = useState('')
    
    console.log(visits)


    useEffect(() => {
        console.log('render')
    })

    const onChange = (event, selectedDate) => {
        let currentDate = selectedDate
        setDate(currentDate)
    }

    const saveVisit = () => {
        setVisits([...visits, {visitDate: date.toDateString(), header: header, content: content}])
        setModalVisible(!modalVisible)
        console.log(visits)
    } 

    const renderSubText = (item) => {
        return (
            <View style={{backgroundColor:'lightgray',padding:10}}>
                <Text>{item.header},</Text>
                <Text>{item.content}</Text>
            </View>
        )
    }

    const renderTitle = (item, expanded) => {
        return (
            <View style={{backgroundColor:'gray', padding:10, flexDirection:'row', justifyContent:'space-between'}}>
                <Text>{item.visitDate}</Text>
                {expanded
                    ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
                    : <Icon style={{ fontSize: 18 }} name="add-circle" />
                } 
            </View>
        )
    }


    return(
        <Container style={{flex:1, alignItems:'center'}}>
            <View>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{backgroundColor:'darkblue', width: Dimensions.get('window').width * .7, justifyContent:'center', alignItems:'center', borderRadius: 50, margin:10}}>
                    <Icon name='add' style={{color:'white', fontSize: 40}} />
                </TouchableOpacity>
            </View>
                <Accordion 
                style={{flex:1, width: Dimensions.get('window').width,padding:10}}
                    dataArray={visits} 
                    renderContent={renderSubText}
                    renderHeader={renderTitle}
                />

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                           
                >
                    <Container>
                        <Content padder currentlyFocusedInput={true}>
                        
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            // is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                            <View style={{flexDirection:'row', justifyContent:'space-evenly', padding:25}}>
                                <TouchableOpacity onPress={() => saveVisit()} >
                                    <Icon type="AntDesign" name='check' />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Icon type="AntDesign" name='close' />
                                </TouchableOpacity>
                            </View>
                            
                            <View style={{justifyContent:'center', alignItems:'center'}}>
                                <Item style={styles.headerInput} currentlyFocusedInput={true}> 
                                    <Input  
                                        placeholder='Note Title'
                                        placeholderTextColor='rgba(0,0,0, .3)'
                                        onChangeText={text => setHeader(text)}
                                        value={header}
                                        scrollEnabled={true}
                                        currentlyFocusedInput={true}
                                        
                                    />
                                    { header !== '' 
                                    ?
                                    <Icon type="AntDesign" name='checkcircle' style={{color: 'lightgreen'}} />
                                    :
                                    <Icon type="AntDesign" name='closecircle' style={{color: 'red'}} />
                                    }
                                </Item>
                                <Item>
                                    <Textarea rowSpan={5} style={{width:'100%',borderRadius: 5}} bordered placeholder="Description..." 
                                    onChangeText={text => setContent(text)}
                                    value={content}
                                    />
                                </Item>
                            </View>
                        </Content> 
                     </Container>
                </Modal>
        </Container>
    )
} 


const styles = StyleSheet.create({
    headerInput:{
        borderBottomWidth:2,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderLeftWidth:2,
        borderRadius: 50,
        marginBottom:25,
        paddingLeft: 15
    }
})