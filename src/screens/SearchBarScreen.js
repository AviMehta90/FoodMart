import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Header,
  Item,
  InputText,
  ActivityIndicator,
  FlatList,
  Platform,
  Icon,
} from "react-native";
import axios from "axios";
import { Card, Button, SearchBar } from "react-native-elements";

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, search: "" };
    this.arrayholder = [];
  }
  componentDidMount() {
    return fetch('https://bhavya3.pythonanywhere.com/api/dishes/')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dishes: responseJson.food,
          },
          function () {
            this.arrayholder = responseJson.food;
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  search = (text) => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();

      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dishes: newData,
      search: text,
    });
  }

  render() {
    if (this.state.isLoading) {
      // Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 100 }}>
          <ActivityIndicator color="#0000ff" />
        </View>
      );
    }

    return (
      <View>
        <SearchBar
          round
          placeholder="Type Here..."
          onChangeText={(text) => this.SearchFilterFunction(text)}
          onClear={(text) => this.SearchFilterFunction("")}
          value={this.state.search}
        />
        <FlatList
          data={this.state.dishes}
          renderItem={({ item }) => this.renderItem(item)}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  renderItem(item) {
    let src = this.state.search;
    if (src !== "") {
      return (
        <Card>
          <Card.Image source={{ uri: item.image }} />
          <Text style={{ marginBottom: 10, marginTop: 20 }} h2>
            {item.name}
          </Text>
          <Text style={styles.price} h4>
            {item.categorie}
          </Text>
          <Text style={styles.price} h4>
            {item.price}
          </Text>
          <Text h4 style={styles.description}>
            blah blah blah!!!
          </Text>
          <Button title="Add to Cart" onPress={() => alert("Button Clicked!")} />
        </Card>
      );
    } else {
      return null;
    }

  }
}

const styles = StyleSheet.create({
  name: {
    color: "#5a647d",
    fontWeight: "bold",
    fontSize: 30,
  },
  price: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    color: "#c1c4cd",
  },
});
