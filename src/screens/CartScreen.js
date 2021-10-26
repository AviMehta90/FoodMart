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
  Platform,
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
      <View style={styles.container}>
        <View>
          <Text style={{fontFamily: 'monsterBold', fontSize: 30}}>CART ITEMS</Text>
        </View>
        <FlatList
          style={{width: width,}}
          showsVerticalScrollIndicator={false}
          data={this.state.dataCart}
          renderItem={({ item, index }) => this.renderCart(item, index)}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => this.handleRefresh()}
          refreshing={this.state.refreshing}
        />

        <Text style={{fontSize: 20, color:"#272343", fontFamily: 'monsterMed'}}>
          ${this.onLoadTotal()}
        </Text>

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
          style={{ width: 100, height: 100, borderRadius: 100 }}
          source={{ uri: item.food.dish_image }}
        />
        <View style={styles.parent}>
          <View>
            <Text style={{ fontSize: 20, fontFamily: 'monsterMed' }}>{item.food.dish_name}</Text>
            <Text style={{fontFamily: 'monsterMed'}}>Lorem Ipsum de food</Text>
          </View>
          <View style={styles.pricemain}>
            <Text style={[styles.price,{fontFamily: 'monsterBold'}]}>${item.price * item.quantity}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => this.onChangeQual(i, false)}>
                <Icon
                  name="ios-remove-circle"
                  size={35}
                  color={"#272343"}
                  style={{
                    shadowColor: '#171717',
                    elevation: Platform.OS === 'ios' ? 1 : 4,
                    shadowOffset: {width: 2, height: 4},
                    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.2,
                    shadowRadius: 3,
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => this.onChangeQual(i, true)}>
                <Icon
                  name="ios-add-circle"
                  size={35}
                  color={"#272343"}
                  style={{
                    shadowColor: '#171717',
                    elevation: Platform.OS === 'ios' ? 1 : 4,
                    shadowOffset: {width: 2, height: 4},
                    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.2,
                    shadowRadius: 3,
                  }}
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
  container: {
    padding: 20,
    marginTop: Platform.OS === 'ios' ? 40 : 30,
    marginBottom: 50,
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  main: {
    marginHorizontal: 25,
    backgroundColor: "#E3F6F5",
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
    fontFamily: 'monsterBold',
    fontWeight: "bold",
    color: "#272343",
    fontSize: 20,
  },
quantity: {
  fontFamily: 'monsterBold',
  paddingHorizontal: 8,
  fontSize: 18,
},
checkoutbtn: {
<<<<<<< HEAD
  backgroundColor: "#272343",
  width: width - 40,
=======
  backgroundColor: "#33c37d",
  width: width - 10,
>>>>>>> 26ecacbb20874b2e2f5ab18877e2fdfa206e658a
  alignItems: "center",
  padding: 10,
  borderRadius: 5,
  margin: 20,
},
checkout: {
  fontSize: 24,
  fontFamily: 'monsterBold',
  color: "white",
},
});
