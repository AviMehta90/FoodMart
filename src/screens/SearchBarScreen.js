import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Header,
  Item,
  Dimensions,
  InputText,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  Platform,
  Icon,
} from "react-native";

import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import colors from '../../assets/colors/colors';


import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Button, SearchBar } from "react-native-elements";

var { width, height } = Dimensions.get('screen');

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = {
      isLoading: true,
      search: "",
      };
    this.arrayholder = [];

    axios.get("https://bhavya3.pythonanywhere.com/api/dishes").then((res) => {
      this.setState(
        {
          isLoading: false,
          dishes: res.data,
        },
        function () {
          this.arrayholder = res.data;
        }
      );
    });
  }
  // componentDidMount() {
  //   return fetch('https://bhavya3.pythonanywhere.com/api/dishes/')
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       this.setState(
  //         {
  //           isLoading: false,
  //           dishes: responseJson,
  //         },
  //         function () {
  //           this.arrayholder = responseJson;
  //         }
  //       );
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }
  //
  // search = (text) => {
  //   console.log(text);
  // };
  // clear = () => {
  //   this.search.clear();
  // };

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.dish_name ? item.dish_name.toUpperCase() : "".toUpperCase();

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

        <View style={styles.divFood}>
          <Image
            style={styles.imageFood}
            resizeMode="contain"
            source={{ uri: item.dish_image }}
          />
          <View
            style={{
              height: width / 2 - 20 - 90,
              backgroundColor: "transparent",
              width: width / 2 - 20 - 10,
            }}
          />
          <Text style={{ fontWeight: "bold", fontSize: 22, textAlign: "center" }}>
            {item.dish_name}
          </Text>
          <Text>Descp Food and Details</Text>
          <Text style={{ fontSize: 20, color: "green" }}>
            ${item.dish_price}
          </Text>

          <TouchableOpacity onPress={() => this.onClickAddCart(item)} style={styles.cartbtn}>
            <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
              Add Cart
            </Text>
            <View style={{ width: 10 }} />
            <Icon name="ios-add-circle" size={30} color={"white"} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }

  }

  onClickAddCart(data) {
    const itemcart = {
      food: data,
      quantity: 1,
      price: data.dish_price,
    };

    AsyncStorage.getItem("cart")
      .then((datacart) => {
        if (datacart !== null) {
          // We have data!!
          const cart = JSON.parse(datacart);
          cart.push(itemcart);
          AsyncStorage.setItem("cart", JSON.stringify(cart));
        } else {
          const cart = [];
          cart.push(itemcart);
          AsyncStorage.setItem("cart", JSON.stringify(cart));
        }
        alert("Add Successfully");
      })
      .catch((err) => {
        alert(err);
      });
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
  imageFood: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
  },
  divFood: {
    width: width / 2 - 20,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: "white",
  },
  cartbtn: {
    width: width / 2 - 40,
    backgroundColor: "#33c37d",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: 4,
  },
});
