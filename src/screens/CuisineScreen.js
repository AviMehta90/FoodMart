import React from "react";
import {
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  Platform
} from "react-native";

const { width, height } = Dimensions.get('screen');

import colors from '../../assets/colors/colors';

import Cuisine from "../components/Cuisines";
import Banner from "./Banner";
import axios from "axios";

class HomeScreen extends React.Component {

  
  constructor(props) {
    super(props);

    this.state = {
      selectCatg: 0,
      cuisinesData: [],
    };

    axios.get('https://bhavya3.pythonanywhere.com/api/cuisines/')
      .then(res => {
        const cuisinesData = res.data;
        this.setState({ cuisinesData });
      });
  }


  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleTitle}>Delivery</Text>
        </View>
        <Banner/>
        <View style={styles.cuisineWrapper}>
          <Text style={styles.cuisineTitle}>Cuisines</Text>
          <View style={styles.cuisinesListWrapper}>
            <FlatList
              data={this.state.cuisinesData}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return <Cuisine cuisData={item} navigation={this.props.navigation} />;
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding: 20,
  },  
  titleWrapper:{
    marginTop: Platform.OS === 'ios' ? (0.07*width) : 0.1*width
  },
  titleTitle:{
    fontFamily: "monsterSemiBold",
    color: colors.textDark,
    fontSize: 32,
    marginTop: 5,
    marginBottom: 15,
  },
  cuisineTitle:{
    fontFamily: 'monsterBold', 
    fontSize: 20, 
    marginTop: 10, 
    marginBottom: 10,
  },
  cuisineWrapper: {
    marginTop: 20,
  },
  cuisinesListWrapper: {
    paddingVertical: 0
  },
});

export default HomeScreen;

//
// import React, { Component } from "react";
// import {
//   Text,
//   FlatList,
//   Image,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   SafeAreaView ,
//   View,
//   ScrollView,
//   TextInput,
// } from "react-native";
// var { height, width } = Dimensions.get("window");
//
// import Swiper from "react-native-swiper";
// import Icon from "react-native-vector-icons/Ionicons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
//
// export default class HomeScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       dataBanner: [],
//       dataCategories: [],
//       dataFood: [],
//       selectCatg: 0,
//     };
//   }
//
//   componentDidMount() {
//     const url = "http://tutofox.com/foodapp/api.json";
//     return fetch(url)
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({
//           isLoading: false,
//           dataBanner: responseJson.banner,
//           dataCategories: responseJson.categories,
//           dataFood: responseJson.food,
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }
//
//   render() {
//     return (
//       <ScrollView>
//         <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
//           <View style={{ width: width, alignItems: "center" }}>
//             <Image
//               style={{ height: 60, width: width / 2, margin: 10 }}
//               resizeMode="contain"
//               source={{ uri: "https://tutofox.com/foodapp/foodapp.png" }}
//             />
//             <Swiper
//               style={{ height: width / 2 }}
//               showsButtons={false}
//               autoplay={true}
//               autoplayTimeout={2}
//             >
//               {this.state.dataBanner.map((itembann, i) => {
//                 return (
//                   <Image
//                     style={styles.imageBanner}
//                     resizeMode="contain"
//                     source={{ uri: itembann }}
//                     key={i}
//                   />
//                 );
//               })}
//             </Swiper>
//             <View style={{ height: 20 }} />
//           </View>
//
//           <View
//             style={{
//               width: width,
//               borderRadius: 20,
//               paddingVertical: 20,
//               backgroundColor: "white",
//             }}
//           >
//             <Text style={styles.titleCatg}>
//               Categories {this.state.selectCatg}
//             </Text>
//             <FlatList
//               horizontal={true}
//               data={this.state.dataCategories}
//               renderItem={({ item }) => this._renderItem(item)}
//               keyExtractor={(item, index) => index.toString()}
//             />
//             <FlatList
//               data={this.state.dataFood}
//               numColumns={2}
//               renderItem={({ item }) => this._renderItemFood(item)}
//               keyExtractor={(item, index) => index.toString()}
//             />
//             <View style={{ height: 20 }} />
//           </View>
//         </View>
//       </ScrollView>
//     );
//   }
//
//   _renderItem(item) {
//     return (
//       <TouchableOpacity
//         style={[styles.divCategorie, { backgroundColor: item.color }]}
//         onPress={() => this.setState({ selectCatg: item.id })}
//       >
//         <Image
//           style={{ width: 100, height: 80 }}
//           resizeMode="contain"
//           source={{ uri: item.image }}
//         />
//         <Text style={{ fontWeight: "bold", fontSize: 22 }}>{item.name}</Text>
//       </TouchableOpacity>
//     );
//   }
//
//   _renderItemFood(item) {
//     let catg = this.state.selectCatg;
//     if (catg == 0 || catg == item.categorie) {
//       return (
//         <TouchableOpacity style={styles.divFood}>
//           <Image
//             style={styles.imageFood}
//             resizeMode="contain"
//             source={{ uri: item.image }}
//           />
//           <View
//             style={{
//               height: width / 2 - 20 - 90,
//               backgroundColor: "transparent",
//               width: width / 2 - 20 - 10,
//             }}
//           />
//           <Text
//             style={{ fontWeight: "bold", fontSize: 22, textAlign: "center" }}
//           >
//             {item.name}
//           </Text>
//           <Text>Descp Food and Details</Text>
//           <Text style={{ fontSize: 20, color: "green" }}>${item.price}</Text>
//
//           <TouchableOpacity
//             onPress={() => this.onClickAddCart(item)}
//             style={{
//               width: width / 2 - 40,
//               backgroundColor: "#33c37d",
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "center",
//               borderRadius: 5,
//               padding: 4,
//             }}
//           >
//             <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
//               Add Cart
//             </Text>
//             <View style={{ width: 10 }} />
//             <Icon name="ios-add-circle" size={30} color={"white"} />
//           </TouchableOpacity>
//         </TouchableOpacity>
//       );
//     }
//   }
//
//   onClickAddCart(data) {
//     // console.log(data);
//     const itemcart = {
//       food: data,
//       quantity: 1,
//       price: data.price,
//     };
//
//     AsyncStorage.getItem("cart")
//       .then((datacart) => {
//         if (datacart !== null) {
//           // We have data!!
//           const cart = JSON.parse(datacart);
//           cart.push(itemcart);
//           AsyncStorage.setItem("cart", JSON.stringify(cart));
//         } else {
//           const cart = [];
//           cart.push(itemcart);
//           AsyncStorage.setItem("cart", JSON.stringify(cart));
//         }
//         alert("Add Successfully");
//       })
//       .catch((err) => {
//         alert(err);
//       });
//   }
// }
//
// const styles = StyleSheet.create({
//   imageBanner: {
//     height: width / 2,
//     width: width - 40,
//     borderRadius: 10,
//     marginHorizontal: 20,
//   },
//   divCategorie: {
//     backgroundColor: "red",
//     margin: 5,
//     alignItems: "center",
//     borderRadius: 10,
//     padding: 10,
//   },
//   titleCatg: {
//     fontSize: 30,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   imageFood: {
//     width: width / 2 - 20 - 10,
//     height: width / 2 - 20 - 30,
//     backgroundColor: "transparent",
//     position: "absolute",
//     top: -45,
//   },
//   divFood: {
//     width: width / 2 - 20,
//     padding: 10,
//     borderRadius: 10,
//     marginTop: 55,
//     marginBottom: 5,
//     marginLeft: 10,
//     alignItems: "center",
//     elevation: 8,
//     shadowOpacity: 0.3,
//     shadowRadius: 50,
//     backgroundColor: "white",
//   },
// });
