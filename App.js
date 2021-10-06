import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import LoginView from "./src/accountlogin/Login";
import SignUpView from "./src/accountlogin/SignUp";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SignUpStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SignUpStack.Navigator initialRouteName="SignUp">
        <SignUpStack.Screen name="SignUp" component={SignUpView} />
        <SignUpStack.Screen name="Login" component={LoginView} />
      </SignUpStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
