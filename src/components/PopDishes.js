import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import AsyncStorage from "@react-native-async-storage/async-storage";

var { height, width } = Dimensions.get("window");

import colors from '../../assets/colors/colors';

export default class Dishes extends React.Component {
  render() {
    const item_is_popular = this.props.dishData.cuisine_id;
    const foodItem = this.props.dishData;
    return (
        (item_is_popular) ?
        <View style={styles.popCardWrapper}>
            <View>
                <View>
                    <View style={styles.popTopWapper}>
                        <Icon name={'heart-sharp'} size={15}></Icon>
                        <Text style={styles.popTopText}>Top of the week</Text>
                    </View>
                    <View style={styles.popTitlesWrapper}>
                        <Text style={styles.popTitlesTitle}>
                            {this.props.dishData.dish_name}
                        </Text>
                        <Text style={styles.popTitlesDesc}>Food Desc</Text>
                    </View>
                </View>
                <View style={styles.popBottomWrapper}>
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
            <View style={styles.popCardRight}>
                <Image
                    style={styles.popCardImage}
                    source={{ uri: this.props.dishData.dish_image }}
                />
            </View>
        </View>
        : null
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

  popCardWrapper: {
    width: 0.85*width,
    backgroundColor: colors.secondary,
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderRadius: 25,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: '#171717',
    elevation: Platform.OS === 'ios' ? 0 : 4,
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.4,
    shadowRadius: 3,

  },

  popTopWapper: {
    flexDirection: 'row'
  },
  popTopText: {
       alignItems: 'center',
       marginLeft: 10,
       fontFamily: 'monsterMed'
  },
    popTitlesWrapper: {
        marginTop: 20,

    },
    popTitlesTitle: {
        fontFamily: 'monsterMed',
        fontSize: 20,
        color: colors.textDark,
    },
    popTitlesDesc: {
        fontFamily: 'monsterMed',
        fontSize: 12,
        color: 'grey',
    },
    popBottomWrapper: {
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
    popCardRight: {
        marginLeft: 20,
        marginBottom: 10,
        width: 150,
        overflow: 'hidden',
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25
    },
    popCardImage: {
        width: 180,
        height: 125,
        borderRadius: 25,
    },

});
