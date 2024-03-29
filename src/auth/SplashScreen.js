import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';

import colors from '../../assets/colors/colors';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SplashScreen = ({navigation}) => {

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#FFB64C' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image
                animation="bounceIn"
                duraton="1500"
            source={require('./../../assets/food.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View
            style={styles.footer}
            animation="fadeInUpBig"
        >
            <Text style={styles.title}>Famous Foods</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
                <LinearGradient
                    colors={['#272343', '#272343']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Order Up!</Text>
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F6F6'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      elevation: 5,
      shadowColor: '#272727',
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#272343',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold'
  }
});
