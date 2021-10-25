import React, { useEffect } from "react";
import {
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Platform
} from "react-native";

const { width, height } = Dimensions.get('window');

import colors from '../../assets/colors/colors';

import Cuisine from "../components/Cuisines";
import PopDishes from "../components/PopDishes";
import Banner from "./Banner";
import axios from "axios";

import { LogBox } from 'react-native';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectCatg: 0,
      cuisinesData: [],
      popdishData: [],
    };

    axios.get('https://bhavya3.pythonanywhere.com/api/cuisines/')
      .then(res => {
        const cuisinesData = res.data;
        this.setState({ cuisinesData });
      });

      axios.get('https://bhavya3.pythonanywhere.com/api/dishes')
      .then(res => {
        const popdishData = res.data;
        this.setState({ popdishData });
      });
  }

  // Disable the warning
  componentDidMount() {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  };

  render() {
    return (
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleWrapper}>
          <Text style={styles.titleTitle}>Delivery</Text>
        </View>
        <Banner/>
        <View style={styles.cuisineWrapper}>
          <Text style={styles.cuisineTitle}>Cuisines</Text>
          <View style={styles.cuisinesListWrapper}>
            <FlatList
              data={this.state.cuisinesData}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return <Cuisine cuisData={item} navigation={this.props.navigation} />;
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
        <View style={styles.popularWrapper}>
          <Text style={styles.popularTitle}>Popular Dishes</Text>
          <FlatList
            data={this.state.popdishData}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <PopDishes dishData={item} navigation={this.props.navigation} />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding: 20,
    marginBottom: 100
  },  
  titleWrapper:{
    marginTop: Platform.OS === 'ios' ? (0.07*width) : 0.1*width
  },
  titleTitle:{
    fontFamily: "monsterSemiBold",
    color: colors.textDark,
    fontSize: 32,
    marginTop: 5,
    marginBottom: 15,
  },
  cuisineTitle:{
    fontFamily: 'monsterBold', 
    fontSize: 20, 
    marginTop: 10, 
    marginBottom: 10,
  },
  cuisineWrapper: {
    marginTop: 20,
  },
  cuisinesListWrapper: {
    paddingVertical: 0
  },
  popularWrapper: {
    marginVertical: 20,
    alignItems: 'center'
  },
  popularTitle: {
    fontFamily: 'monsterBold', 
    fontSize: 20, 
  },
});

export default HomeScreen;