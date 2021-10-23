import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TouchableHighlight } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/Ionicons';

import CartScreen from './HomeScreen';
import SearchBarScreen from './SearchBarScreen';
import TableFormScreen from './BookTableFormScreen';
import ProfileScreen from './ProfileScreen';
import DishScreen from './DishScreen';
import HomeScreen from './CuisineScreen';


const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const BookTableStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'fast-food' : 'fast-food-outline'
        } else if (route.name === 'Search') {
          iconName = focused ? 'search-sharp' : 'search-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'BookTable') {
          iconName = focused ? 'bookmark' : 'bookmark-outline';
        } else if (route.name === 'Cart') {
          iconName = focused ? 'cart' : 'cart-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      headerShown: false,
      tabBarShowLabel: true,
        tabBarStyle:{
          position: 'absolute',
          botton: 30,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
        }
    })}
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
      />
      <Tab.Screen
        name="Search"
        component={SearchStackScreen}
        screenOptions={{
          tabBarLabel: 'Search',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        screenOptions={{
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen
        name="BookTable"
        component={BookTableStackScreen}
        screenOptions={{
          tabBarLabel: 'BookTable',
          tabBarIcon: () => {
            <MaterialCommunityIcons name="table-furniture" size={24} color="black" />
          }
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        screenOptions={{
          tabBarLabel: 'BookTable',
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

const SearchStackScreen = ({navigation}) => (
<SearchStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <SearchStack.Screen name="SearchBar" component={SearchBarScreen}/>
</SearchStack.Navigator>
);


const BookTableStackScreen = ({navigation}) => (
  <BookTableStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <BookTableStack.Screen name="BookTableForm" component={TableFormScreen}/>
  </BookTableStack.Navigator>
  );
