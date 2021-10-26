import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
var { width } = Dimensions.get("window");
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";

export default class CartScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataCart: [],
      refreshing: false,
    };
  };

  componentDidMount(){
     this.updatecart();
  }

  updatecart = () => {
    AsyncStorage.getItem("cart")
      .then((cart) => {
          if (cart !== null) {
          const cartfood = JSON.parse(cart);
          this.setState({ dataCart: cartfood, refreshing: false,});
        }
        })
      .catch((err) => {
        alert(err);
      });
  }

  handleRefresh = () => {
        this.setState({
            refreshing: true,
          },
          () => {
              this.updatecart();
          },
        )};


  render() {
    const dcart = (this.state.dataCart);
    const navigation = (this.props.navigation);
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ height: 20 }} />

        <FlatList
          data={this.state.dataCart}
          ListHeaderComponent={()=><Text style={{ fontSize: 32, fontWeight: "bold", color: "#33c37d" }}>Cart food</Text>}
          renderItem={({ item, index }) => this.renderCart(item, index)}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => this.handleRefresh()}
          refreshing={this.state.refreshing}
        />

        <Text style={{fontSize: 20, color:"#33c37d"}}>${this.onLoadTotal()}</Text>

        <TouchableOpacity style={styles.checkoutbtn} onPress={() => navigation.navigate("Payment")}>
          <Text style={styles.checkout}>CHECKOUT</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </View>
    );
  }

  renderCart(item, i) {
    return (
    <View style={styles.main}>
        <Image
          resizeMode={"contain"}
          style={{ width: width / 3, height: width / 3 }}
          source={{ uri: item.food.dish_image }}
        />
        <View style={styles.parent}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.food.dish_name}</Text>
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
  width: width - 10,
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
