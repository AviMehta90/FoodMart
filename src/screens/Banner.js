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
} from "react-native";

var { height, width } = Dimensions.get("window");
import axios from "axios";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/Ionicons";

export default class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerData: [],
    };

    axios.get("https://bhavya3.pythonanywhere.com/api/banners").then((res) => {
      this.setState(
        {
          isLoading: false,
          bannerData: res.data,
        }
      );
    });
  }

  // componentDidMount() {
  //   const url = "https://bhavya3.pythonanywhere.com/api/banners";
  //   return fetch(url)
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       this.setState({
  //         isLoading: false,
  //         bannerData: responseJson,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  render() {
    return (
      <Swiper
        style={[styles.bannerStyles]}
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={2}
      >
        {this.state.bannerData.map((itembann, i) => {
          return (
            <Image
              style={styles.imageBanner}
              resizeMode="contain"
              source={{ uri: itembann.banner_image }}
              key={i}
            />
          );
        })}
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
  },
  bannerStyles: {
    height: width / 2 ,
    shadowColor: '#171717',
    elevation: 3,
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }
});
