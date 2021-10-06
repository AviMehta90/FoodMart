import React from "react";

import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const LoginView = ({ navigation }) => {

    return(
        <View style={styles.loginContainer}>
            <View>
                <Text>Login</Text>
            </View>

            <View>
                <View style={styles.loginInputContainer}>
                    <TextInput style={styles.loginInputs} placeholder="Email"/>
                    <TextInput style={styles.loginInputs} placeholder="Password"/>
                </View>
                <View>
                    <Button title="Login"></Button>
                </View>
            </View>

            <View style={styles.signUpPrompt}>
                <Text>Don't have an account?</Text>
                  <Button
                    title="Sign Up"
                    onPress={() => navigation.navigate("SignUpView")}
                  />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    loginContainer:{
        paddingTop: 50,
        paddingHorizontal: 20,
    },

    loginInputs:{
        width:300,
        borderColor: "black",
        borderWidth: 2,
        padding: 5,
        marginBottom: 10,
    },

    loginInputContainer:{
        justifyContent: "center",
        alignItems: "center",
    },

    signUpPrompt:{
        margin: 20,
        flexDirection: "row",
    },
});

export default LoginView;
