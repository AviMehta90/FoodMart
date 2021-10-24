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
  Dimensions,
} from "react-native";

import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import colors from '../../assets/colors/colors';
import { Card, Button, SearchBar } from "react-native-elements";

const { width, height } = Dimensions.get('screen')

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
      <View style={styles.searchWrapper}>
        <SearchBar
          inputStyle={styles.searchBar}
          inputContainerStyle={styles.searchBarInputContainer}
          containerStyle={styles.searchBarContainer}
          round
          searchIcon={() => {
            return <Ionicons 
            name={'search-sharp'} 
            size={30} 
            color={'#FFFFFF'} 
            style={
              {
                marginLeft: 10,
              }
            } />;
          }}
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
  searchWrapper: {
    marginTop: Platform.OS === 'ios' ? 50 : 0.075*height,
  },
  searchBar:{

    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,

  },
  searchBarInputContainer:{
    backgroundColor: '#272343',
    
  },
  searchBarContainer:{
    padding: 0,
    backgroundColor: "#272343",
    marginHorizontal: 0.025*width,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#272727',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
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
