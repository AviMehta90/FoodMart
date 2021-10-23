import React, { useState, createRef } from 'react';
import { Text, View, } from 'react-native';
import { Modal, Picker, Label, FormItem } from 'react-native-form-component';


const BookTableForm = ({navigation}) => {

  const [data, setData] = useState({
    bookingName: "",
    bookingNum: "",
    people: "",
    time: Date(),
    stateChange: false,
  });

  const addBookName = (val) => {
    setData({
      ...data,
      bookingName: val,
      stateChange: true
    })
  }

  const addBookNum = (val) => {
    setData({
      ...data,
      bookingNum: val,
    })
  }

  const addPersons = (val) => {
    setData({
      ...data,
      people: val,
    })
  }


  return (
    <View>
      <View>
        <FormItem
          label="Booking Name"
          isRequired
          value={data.bookingName}
          onChangeText={(bname) => addBookName(bname)}
        />
        <FormItem
          label="Booking Number"
          isRequired
          value={data.bookingNum}
          onChangeText={(bnum) => addBookNum(bnum)}
        />
        <Picker
          items={[
            { label: 'Two', value: 2 },
            { label: 'Three', value: 3 },
            { label: 'Four', value: 4 },
            { label: 'Five', value: 5 },
            { label: 'Six', value: 6 },
            { label: 'Seven', value: 7 },
            { label: 'Eight', value: 8 },
          ]}
          label="Number of People"
          selectedValue={data.people}
          onSelection={(item) => addPersons(item)}
        />
      </View>
      <View>
          
      </View>
    </View>
    
  );

}

export default BookTableForm;