import React from "react";

import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const SignUpView = ({navigation}) => {

    return(
        <View style={styles.signUpContainer}>
            <View>
                <Text>Welcome to food delivery App!!</Text>
            </View>

            <View>
                <View style={styles.signUpInputContainer}>
                    <TextInput style={styles.signUpInputs} placeholder="Email"/>
                    <TextInput style={styles.signUpInputs} placeholder="Password"/>
                    <TextInput style={styles.signUpInputs} placeholder="Confirm Password"/>
                </View>
                <View>
                    <Button title="Sign Up"></Button>
                </View>
            </View>

            <View style={styles.loginPrompt}>
                <Text>Have an account already?</Text>
                <Button
                  title="Login"
                  onPress={() => navigation.navigate("LoginView")}
                />
            </View>
        </View>

    );

}

const styles = StyleSheet.create({

    signUpContainer:{
        paddingTop: 50,
        paddingHorizontal: 20,
    },

    signUpInputs:{
        width:300,
        borderColor: "black",
        borderWidth: 2,
        padding: 5,
        marginBottom: 10,
    },

    signUpInputContainer:{
        justifyContent: "center",
        alignItems: "center",
    },

    loginPrompt:{
        margin: 20,
        flexDirection: "row",
    },

});

export default SignUpView;
