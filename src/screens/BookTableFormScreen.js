import React, {Component, useState} from "react";

import { Text, View,StyleSheet,Button,Modal,Pressable ,Icon, Platform} from 'react-native';
import { Provider ,Appbar, Avatar,TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Datetime from "./Datetime";
import axios from 'axios';
import { TouchableOpacity } from "react-native-gesture-handler";


const BookTableForm = () => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [count, setCount] = useState('');
  const [open, setOpen] = useState(false)

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [datetext, setDateText] = useState('');
  const [timetext, setTimeText] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempData = new Date(currentDate);
    let fDate = tempData.getDate() + '/' + (tempData.getMonth() + 1);
    let fTime = (tempData.getHours() - 12) + ':' + tempData.getMinutes();

    setDateText(fDate);
    setTimeText(fTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  const handleClick = async () => {
    axios.post('https://bhavya3.pythonanywhere.com/api/bookings', {
      customer_name: name,
      phone_num: number,
      no_of_people: count,
      booking_date: datetext,
      booking_time: timetext,
    })
    .then(response => console.log(response.data));
   };

  return (
    <Provider>
        <View style={styles.mainbox}>
            <Text style={styles.labelText}>Name</Text>
            <TextInput
                style={styles.inputText}
                placeholder="Enter Name"
                value={name}
                onChangeText={name => setName(name)}
            />
          <Text style={styles.labelText}>Contact</Text>
            <TextInput
                style={styles.inputText}
                placeholder="Enter Contact Details"
                onChangeText={number => setNumber(number)}
            />
          <Text style={styles.labelText}>Number of people</Text>
            <TextInput
                style={styles.inputText}
                placeholder="Count"
                onChangeText={count => setCount(count)}
            />
            <View>
              <Text>Selected Date: {datetext}</Text>
              <Text>Selected Time: {timetext}</Text>
              <View>
                <TouchableOpacity onPress={showDatepicker}>
                  <View>
                    <Text>Select Date</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={showTimepicker}>
                  <View>
                    <Text>Select Time</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  minimumDate={new Date()}
                  value={date}
                  mode={mode}
                  is24Hour={false}
                  display="default"
                  minuteInterval={30}
                  onChange={onChange}
                />
              )}
            </View>
            <Button
                title="Submit"
                onPress={() => handleClick(this)}
                style={styles.buttonstyle}
                color="#6200EE"
            />
        </View>
    </Provider>
  );
};


const styles = StyleSheet.create({
  title:{
    margin: 10,
    fontSize: 15,
    fontSize: 35
  },
  mainbox:{
    marginTop: Platform.OS === 'ios' ? 40 : 30,
    margin: 15,
  },
  textstyle:{
    fontSize: 18,
    marginBottom: 20,
  },
  labelText:{
    marginTop: 10,
    marginBottom: 5,
  },
  inputText:{
    height:45,
    marginBottom: 15,
  },
  buttonstyle:{
    marginTop: 10,
  },
    centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20 ,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
  },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6
  },
  button: {
    borderRadius: 4,
    padding: 8,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#C82333",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  }
});
export default BookTableForm;
