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
} from "react-native";

import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/Ionicons";
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
      <View style={styles.container}>
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
        </View>
          <FlatList
            data={this.state.dishes}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => this.renderItem(item)}
            enableEmptySections={true}
            style={styles.dishWrapper, [{ marginTop: 10 }]}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
    );
  }

  renderItem(item) {
    let src = this.state.search;
    if (src !== "") {
      return (
        <View style={[styles.CardWrapper, styles.shadow]}>
          <View style={styles.innerWrapper}>
                <View style={styles.TitlesWrapper}>
                <Text style={styles.TitlesTitle}>{item.dish_name}</Text>
                    <Text style={styles.TitlesDesc}>
                      Ingredients
                    </Text>
                    <View style={styles.BottomWrapper}>
                    <View style={styles.dishPriceWrapper}>
                        <Text style={styles.dishPriceText}>
                           ${item.dish_price}   
                        </Text>
                </View>
                </View>
              </View>
              <View style={styles.CardRight}>
                <Image
                    style={styles.CardImage}
                    source={{ uri: item.dish_image }}
                />
              </View>
          </View>
            <TouchableOpacity onPress={() => this.onClickAddCart(item)}>
            <View style={styles.addButton}>
                <Icon name="ios-add" size={30} color={colors.textLight} />
            </View>
            </TouchableOpacity>
        </View>
        // <View style={styles.divFood}>
        //   <Image
        //     style={styles.imageFood}
        //     resizeMode="contain"
        //     source={{ uri: item.dish_image }}
        //   />
        //   <View
        //     style={{
        //       height: width / 2 - 20 - 90,
        //       backgroundColor: "transparent",
        //       width: width / 2 - 20 - 10,
        //     }}
        //   />
        //   <Text style={{ fontWeight: "bold", fontSize: 22, textAlign: "center" }}>
        //     {item.dish_name}
        //   </Text>
        //   <Text>Descp Food and Details</Text>
        //   <Text style={{ fontSize: 20, color: "green" }}>
        //     ${item.dish_price}
        //   </Text>

        //   <TouchableOpacity onPress={() => this.onClickAddCart(item)} style={styles.cartbtn}>
        //     <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
        //       Add Cart
        //     </Text>
        //     <View style={{ width: 10 }} />
        //     <Icon name="ios-add-circle" size={30} color={"white"} />
        //   </TouchableOpacity>
        // </View>
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
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 100,
    alignItems: 'center'
  },
  searchWrapper: {
    marginTop: Platform.OS === 'ios' ? 50 : 0.075*height,
    width: width
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


  CardWrapper: {
    width: 0.85*width,
    backgroundColor: colors.secondary,
    paddingTop: 20,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 10,
    marginHorizontal: 5,
  },

  shadow: {
    shadowColor: '#000',
    elevation: Platform.OS === 'ios' ? 1000 : 4,
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.4,
    shadowRadius: 3,
  },

  innerWrapper: {
    flexDirection: 'row',
    paddingTop: 20,
  },


  TopWapper: {
    flexDirection: 'row'
  },
  TopText: {
       alignItems: 'center',
       marginLeft: 10,
       fontFamily: 'monsterMed'
  },
    TitlesWrapper: {
        marginTop: 20,

    },
    TitlesTitle: {
        fontFamily: 'monsterMed',
        fontSize: 20,
        color: colors.textDark,
    },
    TitlesDesc: {
        fontFamily: 'monsterMed',
        fontSize: 12,
        color: 'grey',
    },
    BottomWrapper: {
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center'
      },
    addButton: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        width: 0.85*width,
        borderRadius: 25,
        alignItems: 'center',
        marginLeft: -20,
        marginTop: 20,
    },
    dishPriceWrapper: {
      marginBottom: 20
  },
  dishPriceText: {
      color: colors.price,
      fontFamily: 'monsterReg',
      fontSize: 20,
  },
    CardRight: {
        marginLeft: 20,
        width: 220,
        overflow: 'hidden'
    },
    CardImage: {
        width: 210,
        height: 125,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        marginLeft: 50,
    },
});
