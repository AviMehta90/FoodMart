import React from "react";
import {
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import { Card, Button } from "react-native-elements";

import colors from '../../assets/colors/colors';

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
var { height, width } = Dimensions.get("window");

export default class Dishes extends React.Component {
  render() {
    const idd = JSON.stringify(this.props.cuisineid);
    const item_id = this.props.dishData.cuisine_id;
    const foodItem = this.props.dishData;
    return (
       (idd === item_id) ?
       <View style={styles.CardWrapper}>
            <View>
            <Text style={styles.TitlesTitle}>
                        {this.props.dishData.dish_name}
                    </Text>
                <View style={styles.TitlesWrapper}>
                    <Text style={styles.TitlesDesc}>
                        Ingredients
                    </Text>
                </View>
                <View style={styles.BottomWrapper}>
                    <View style={styles.addButton}>
                        <TouchableOpacity onPress={() => this.onClickAddCart(foodItem)}>
                            <Icon name="ios-add" size={30} color={colors.textLight} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dishPriceWrapper}>
                        <Text style={styles.dishPriceText}>
                           ${this.props.dishData.dish_price}   
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.CardRight}>
                <Image
                    style={styles.CardImage}
                    source={{ uri: this.props.dishData.dish_image }}
                />
            </View>
        </View>
        : null
        // <View style={styles.divFood}>
        //   <Image
        //     style={styles.imageFood}
        //     resizeMode="contain"
      //       source={{ uri: this.props.dishData.dish_image }}
      //     />
      //     <View
      //       style={{
      //         height: width / 2 - 20 - 90,
      //         backgroundColor: "transparent",
      //         width: width / 2 - 20 - 10,
      //       }}
      //     />
      //     <Text style={{ fontWeight: "bold", fontSize: 22, textAlign: "center" }}>
      //       {this.props.dishData.dish_name}
      //     </Text>
      //     <Text>Descp Food and Details</Text>
      //     <Text style={{ fontSize: 20, color: "green" }}>
      //       ${this.props.dishData.dish_price}
      //     </Text>
      //     <TouchableOpacity onPress={() => this.onClickAddCart(foodItem)} style={styles.cartbtn}>
      //       <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
      //         Add Cart
      //       </Text>
      //       <View style={{ width: 10 }} />
      //       <Icon name="ios-add-circle" size={30} color={"white"} />
      //     </TouchableOpacity>
      //   </View>
      //  : null
    );
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

  CardWrapper: {
    width: 0.85*width,
    backgroundColor: colors.secondary,
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderRadius: 25,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: '#171717',
    elevation: Platform.OS === 'ios' ? 1 : 4,
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.4,
    shadowRadius: 3,
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
        fontSize: 25,
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
        flexDirection: 'row'
    },
    addButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        marginLeft: -20
    },
    dishPriceWrapper: {
      marginLeft: 10,
  },
  dishPriceText: {
      color: colors.price,
      fontFamily: 'monsterReg',
      fontSize: 20,
  },
    CardRight: {
        marginLeft: 20,
        width: 135,
        overflow: 'hidden',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    CardImage: {
        width: 150,
        height: 110,
        borderRadius: 20,
    },
});
