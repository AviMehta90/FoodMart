import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TouchableHighlight } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';

// import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import DishScreen from './DishScreen';
import HomeScreen from './CuisineScreen';
import NewAppNavigator from './NewAppNavigator';


const HomeStack = createNativeStackNavigator();
const DetailsStack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
    tabBarOptions={{
        showLabel: false,
        style:{
          position: 'absolute',
          botton: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#000000',
          borderRadius: 15,
          height: 90,
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        renderScene={(route, navigator) =>
          <TouchableHighlight onPress={() => {
            if (route.index === 0) {
              navigator.push(route[1]);
            } else {
              navigator.pop();
            }
          }}></TouchableHighlight>}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Icon name="ios-home" color="#fff" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: () => (
            <Icon name="ios-notifications" color="#fff" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <Icon name="ios-person" color="#fff" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: () => (
            <Icon name="ios-aperture" color="#fff" size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator initialRouteName="CuisineScreen" screenOptions={{
        headerStyle: {
        backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
        {/* <HomeStack.Screen name="MainTab" component={NewAppNavigator}/> */}
        <HomeStack.Screen name="CuisineScreen" component={HomeScreen}/>
        <HomeStack.Screen name="DishesScreen" component={DishScreen}/>
</HomeStack.Navigator>
);

const DetailsStackScreen = ({navigation}) => (
<DetailsStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="Details" component={DetailsScreen}/>
</DetailsStack.Navigator>
);
