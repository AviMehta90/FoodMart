import React from "react";
import {
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
} from "react-native";
import Dishes from "../components/Dishes";
import axios from "axios";

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
    const { navigation } = this.state;
    return (
      <View>
        <FlatList
          data={this.state.dishes}
          renderItem={({ item }) => {
            return (
              <Dishes dishData={item} cuisineid={cuisine_id} navigation={this.props.navigation} />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
