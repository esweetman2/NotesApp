import React, { useState } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Content, Container , Icon, Item, Input } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AddAppointment({ navigation }) {

    const [name, setName] = useState('')
    const [fromTime, setFromTime] = useState(new Date());
    const [toTime, setToTime] = useState(new Date());
    const [timeMode, setTimeMode] = useState('time');
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);
    const [date, setDate] = useState(new Date())
    const [dateString, setDateString] = useState('')

    
    const onChangeFrom = (event, selectedTime) => {
        const time = selectedTime;
        // setShow(Platform.OS === 'ios');
        setFromTime(time);
      };

    const onChangeTo= (event, selectedTime) => {
        const time = selectedTime;
      setToTime(time);
    };
    
    const onChangeDate= (event, selectedDate) => {
        const date = selectedDate;
    //   setShow(Platform.OS === 'ios');
        setDate(date)
        // console.log(date.toISOString().split('T')[0])
        // setDateString(date.toISOString().split('T')[0]);
    };
    
    return(
        <Container style={styles.container}>
            <Content padder>
                <View>
                <Item rounded style={{backgroundColor:'rgba(0,0,0,.1)', paddingLeft: 10, height: 50}}>
                    <Input placeholder='Name'
                    onChangeText={text => setName(text)}
                    value={name}
                    
                    />
                </Item>
                    <Text style={styles.selectDate}>Select Date</Text>
                    <DateTimePicker
                        // testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDate}
                    />
                </View>
                <View>
                    <View>
                        <Text style={{fontSize:16}}>From: {fromTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</Text>
                    </View>
                        <View> 
                            {showFrom ? (
                                <View>
                                    <TouchableOpacity onPress={() => setShowFrom(!showFrom)} style={styles.showBtn}>
                                    <Icon type="AntDesign" name="minus" />
                                </TouchableOpacity>
                                    <DateTimePicker
                                    // testID="dateTimePicker"
                                    style={styles.datePicker}
                                    value={fromTime}
                                    mode={timeMode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChangeFrom}
                                    />
                                </View>
                            )
                            :(
                            <TouchableOpacity onPress={() => setShowFrom(!showFrom)} style={styles.showBtn}>
                                <Icon type="AntDesign" name="plus" />
                            </TouchableOpacity>
                            )
                            }
                        </View>
                    
                    {/* <TouchableOpacity onPress={() => setShowFrom(!showFrom)} >
                        <View>
                            <Text>Select</Text>
                        </View>
                    </TouchableOpacity> */}
                        <View>
                            <Text style={{fontSize:16}}>To: {toTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</Text>
                        </View>
                        <View>
                            {showTo ? (
                                <View style={styles.timeContainer}>
                                    <TouchableOpacity onPress={() => setShowTo(!showTo)} style={styles.showBtn}>
                                        <Icon type="AntDesign" name="minus" />
                                    </TouchableOpacity>
                                        <DateTimePicker
                                        // testID="dateTimePicker"
                                        style={styles.datePicker}
                                        value={toTime}
                                        mode={timeMode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeTo}
                                        />
                                </View>
                                )
                                :
                                (
                                <TouchableOpacity onPress={() => setShowTo(!showTo)} style={styles.showBtn}>
                                    <Icon type="AntDesign" name="plus" />
                                </TouchableOpacity>
                                )
                                }
                        </View>
                        <View>
                            {/* <TouchableOpacity onPress={() => setShowTo(!showTo)}>
                                <View>
                                    <Text>Select</Text>
                                </View>
                            </TouchableOpacity> */}
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate("Agenda", {
                                date: date.toISOString().split('T')[0],
                                name: name,
                                fromTime: fromTime.toLocaleTimeString(navigator.language, {hour:'2-digit', minute:'2-digit'}),      
                                toTime: toTime.toLocaleTimeString(navigator.language, {hour: '2-digit',minute:'2-digit'})
                            })}
                            style={styles.saveContainer}
                            >
                                <View>
                                    <Text style={styles.saveText}>Save</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                </View>
            </Content>
        </Container>
    )
} 

const styles = StyleSheet.create({
    container:{
        // backgroundColor: 'lightblue'
    },
    selectDate:{
        textAlign:'center',
        fontSize: 18,
        padding:20
    },
    showBtn:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10

    },
    timeContainer:{
        marginBottom: 10
    },
    saveContainer:{
        margin:25,
        backgroundColor:'blue',
        borderRadius:3

    },
    saveText:{
        fontSize:18,
        textAlign:'center',
        padding:15,
        color:'white'
    }

})