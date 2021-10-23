import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
var { width } = Dimensions.get("window");
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCart: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("cart")
      .then((cart) => {
        if (cart !== null) {
          // We have data!!
          const cartfood = JSON.parse(cart);
          this.setState({ dataCart: cartfood });
        }
      })
      .catch((err) => {
        alert(err);
      });

  }

  render() {
    // console.log(dataCart);
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ height: 20 }} />
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#33c37d" }}>Cart food</Text>
        <View style={{ height: 10 }} />

        <View style={{ flex: 1 }}>
          <ScrollView>
            {this.state.dataCart.map((item, i) => {
              return (
                <View style={styles.main} key={i}>
                  <Image
                    resizeMode={"contain"}
                    style={{ width: width / 3, height: width / 3 }}
                    source={{ uri: item.food.image }}
                  />
                  <View style={styles.parent}>
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.food.name}</Text>
                      <Text>Lorem Ipsum de food</Text>
                    </View>
                    <View style={styles.pricemain}>
                      <Text style={styles.price}>${item.price * item.quantity}</Text>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => this.onChangeQual(i, false)}>
                          <Icon
                            name="ios-remove-circle"
                            size={35}
                            color={"#33c37d"}
                          />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{item.quantity}</Text>
                        <TouchableOpacity onPress={() => this.onChangeQual(i, true)}>
                          <Icon
                            name="ios-add-circle"
                            size={35}
                            color={"#33c37d"}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>


      <Text style={{fontSize: 20, color:"#33c37d"}}>${this.onLoadTotal()}</Text>

        <TouchableOpacity style={styles.checkoutbtn}>
          <Text style={styles.checkout}>CHECKOUT</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </View>
    );
  }

  onLoadTotal()
  {
    var total = 0
    const cart = this.state.dataCart
    for(var i = 0; i < cart.length; i++) {
      total = total + (cart[i].price*cart[i].quantity)
    }
    return total;
  }




  onChangeQual(i, type) {
    const dataCar = this.state.dataCart
    let cantd = dataCar[i].quantity;
    if (type) {
      cantd = cantd + 1;
      dataCar[i].quantity = cantd;
      AsyncStorage.setItem ('cart', JSON.stringify (dataCar));
      this.setState({ dataCart: dataCar });
    } else if (type == false && cantd >= 2) {
      cantd = cantd - 1;
      dataCar[i].quantity = cantd;
      AsyncStorage.setItem ('cart', JSON.stringify (dataCar));
      this.setState({ dataCart: dataCar });
    }
    else if (type == false && cantd == 1) {
      dataCar.splice(i, 1);
      AsyncStorage.setItem ('cart', JSON.stringify (dataCar));
      this.setState({ dataCart: dataCar });
    }
  }
}

const styles = StyleSheet.create({
  main: {
    width: width - 20,
    margin: 10,
    backgroundColor: "transparent",
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#cccccc",
    paddingBottom: 10,
},
parent: {
  flex: 1,
  backgroundColor: "transparent",
  padding: 10,
  justifyContent: "space-between",
},
pricemain: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontWeight: "bold",
    color: "#33c37d",
    fontSize: 20,
  },
quantity: {
  paddingHorizontal: 8,
  fontWeight: "bold",
  fontSize: 18,
},
checkoutbtn: {
  backgroundColor: "#33c37d",
  width: width - 40,
  alignItems: "center",
  padding: 10,
  borderRadius: 5,
  margin: 20,
},
checkout: {
  fontSize: 24,
  fontWeight: "bold",
  color: "white",
},
});
