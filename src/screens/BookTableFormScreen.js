import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    PickerIOSItem,

} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';

import { AuthContext } from '../components/context';

import Users from '../data/users';

const BookTableForm = ({navigation}) => {
  var min = moment().minute();
  var time = moment().add(min > 30 && 1 , 'hours').minutes(min <= 30 ? 30 : 0).format("hh:mm a");
    const [data, setData] = useState({
        bookingName: '',
        person: 0,
        bookingTime: time,
    });
  
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
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

  const [selectedValue, setSelectedValue] = useState("");

  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor='#FFB64C' barStyle="light-content"/>
      <Animatable.View
          animation="fadeInUpBig"
          style={styles.footer}
      >
          <Text style={styles.text_footer}>Booking Name</Text>
          <View style={styles.action}>
              <FontAwesome
                  name="user-o"
                  color="#05375a"
                  size={20}
              />
              <TextInput
                  placeholderTextColor="#666666"
                  style={styles.textInput}
              />
          </View>
          <Text style={styles.text_footer}>Number of people</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedValue}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="2" value="2" />
            </Picker>
          </View>
            <Text style={styles.text_footer}>Booking Time</Text>
          <View>
            <View>
              <Button onPress={showDatepicker} title="Show date picker!" />
            </View>
            <View>
              <Button onPress={showTimepicker} title="Show time picker!" />
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
      </Animatable.View>
    </View>
  );
};

export default BookTableForm;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFB64C'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    pickerContainer: {
      flex: 1,
      paddingTop: 40,
      alignItems: "center"
    }
  });
