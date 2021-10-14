import React from 'react';
import DishScreen from './DishScreen';
import HomeScreen from './CuisineScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const InAppNavigator = createNativeStackNavigator();

function AppNavigator(){
    return(
        <NavigationContainer independent={true}>
            <InAppNavigator.Navigator initialRouteName="HomeScreen">
                <InAppNavigator.Screen name="HomeScreen" component={HomeScreen}/>
                <InAppNavigator.Screen name="DishesScreen" component={DishScreen}/>
            </InAppNavigator.Navigator>
        </NavigationContainer>
        
    )
}

export default AppNavigator;