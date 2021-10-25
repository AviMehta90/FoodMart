import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";

import Dishes from "../components/Dishes";
import colors from '../../assets/colors/colors';

import axios from "axios";

var { width, height } = Dimensions.get('window');

export default class DishScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: [],
    };

    axios.get("https://bhavya3.pythonanywhere.com/api/dishes").then((res) => {
      const dishes = res.data;
      this.setState({ dishes });
    });
  }

  render() {
    const { cuisine_id } = this.props.route.params;
    return (
      <View style={styles.dishContainer}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleTitle}>Dishes</Text>
        </View>
        <FlatList
          data={this.state.dishes}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <Dishes 
                dishData={item} 
                cuisineid={cuisine_id}
                navigation={this.props.navigation}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  dishContainer: {
    flex:1,
    padding: 20,
    alignItems: 'center',
    marginBottom: 100
  },
  titleWrapper:{
    marginTop: Platform.OS === 'ios' ? (0.07*width) : 0.05*width
  },
  titleTitle:{
    fontFamily: "monsterSemiBold",
    color: colors.textDark,
    fontSize: 32,
    marginTop: 5,
  },

});
