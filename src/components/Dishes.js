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
        <View style={styles.divFood}>
          <Image
            style={styles.imageFood}
            resizeMode="contain"
            source={{ uri: this.props.dishData.dish_image }}
          />
          <View
            style={{
              height: width / 2 - 20 - 90,
              backgroundColor: "transparent",
              width: width / 2 - 20 - 10,
            }}
          />
          <Text style={{ fontWeight: "bold", fontSize: 22, textAlign: "center" }}>
            {this.props.dishData.dish_name}
          </Text>
          <Text>Descp Food and Details</Text>
          <Text style={{ fontSize: 20, color: "green" }}>
            ${this.props.dishData.dish_price}
          </Text>

          <TouchableOpacity onPress={() => this.onClickAddCart(foodItem)} style={styles.cartbtn}>
            <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
              Add Cart
            </Text>
            <View style={{ width: 10 }} />
            <Icon name="ios-add-circle" size={30} color={"white"} />
          </TouchableOpacity>
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
