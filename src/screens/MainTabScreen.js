import React from 'react';

import { Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TouchableHighlight } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/Ionicons';

import CartScreen from './CartScreen';
import SearchBarScreen from './SearchBarScreen';
import TableFormScreen from './BookTableFormScreen';
import ProfileScreen from './ProfileScreen';
import DishScreen from './DishScreen';
import HomeScreen from './CuisineScreen';
import CartStackScreen from './CartStackScreen';

import colors from '../../assets/colors/colors';


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
          iconName = focused ? 'fast-food' : 'fast-food-outline';
          color = focused ? '#272343' : '#000'
        } else if (route.name === 'Search') {
          iconName = focused ? 'search-sharp' : 'search-outline';
          color = focused ? '#272343' : '#000'
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
          color = focused ? '#272343' : '#000'
        } else if (route.name === 'BookTable') {
          iconName = focused ? 'bookmark' : 'bookmark-outline';
          color = focused ? '#272343' : '#000'
        } else if (route.name === 'Cart') {
          iconName = focused ? 'cart' : 'cart-outline';
          color = focused ? '#272343' : '#000'
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      headerShown: false,
      tabBarShowLabel: false,
        tabBarStyle:{
          position: 'absolute',
          left: (0.05*width),
          right: (0.05*width),
          alignSelf: 'center',
          justifyContent: 'center',
          bottom: 20,
          elevation: 4,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 80,
          paddingTop: Platform.OS === 'ios' ? 20 : 0,
          shadowColor: '#171717',
          shadowOffset: {width: 2, height: 4},
          shadowOpacity: 0.5,
          shadowRadius: 3,
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
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
      <Tab.Screen
        name="BookTable"
        component={BookTableStackScreen}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackScreen}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator
initialRouteName="CuisineScreen"
screenOptions={{
        headerShown: false,
    }}>
        {/* <HomeStack.Screen name="MainTab" component={NewAppNavigator}/> */}
        <HomeStack.Screen name="CuisineScreen" component={HomeScreen}/>
        <HomeStack.Screen name="DishesScreen" component={DishScreen}/>
</HomeStack.Navigator>
);

const SearchStackScreen = ({navigation}) => (
<SearchStack.Navigator
screenOptions={{
  headerShown:false,
}}

    //     screenOptions={{
    //       title: '',
    //       headerStyle: {
    //       backgroundColor: '#272343',
    //       },
    //       headerTintColor: '#fff',
    //       headerTitleStyle: {
    //       fontWeight: 'bold'
    //     }
    // }}
    >
        <SearchStack.Screen name="SearchBar" component={SearchBarScreen}/>
</SearchStack.Navigator>
);


const BookTableStackScreen = ({navigation}) => (
  <BookTableStack.Navigator screenOptions={{
    headerShown: false,
}}>
          <BookTableStack.Screen name="BookTableForm" component={TableFormScreen}/>
  </BookTableStack.Navigator>
  );
