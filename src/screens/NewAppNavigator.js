import React from 'react';
import DishScreen from './DishScreen';
import HomeScreen from './CuisineScreen';
import { Button } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const InAppNavigator = createNativeStackNavigator();

function AppNavigator(){
    return(
            <InAppNavigator.Navigator initialRouteName="HomeScreen">
                <InAppNavigator.Screen name="Cuisines" component={HomeScreen}/>
                <InAppNavigator.Screen name="Dishes" component={DishScreen}  
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.popToTop()}
                          title="Cuisines"
                          color="#000"
                        />
                      ),
                  })}     
                />
            </InAppNavigator.Navigator>
    )
}

export default AppNavigator;