import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';

class Cuisine extends React.Component {


    render() {
        return (

          <TouchableOpacity
            style={[styles.divCategorie, { backgroundColor: "grey" }]}
            onPress={() => this.props.navigation.navigate('DishesScreen', {cuisine_id: this.props.cuisData.id})}
          >
            <Image
              style={{ width: 100, height: 80 }}
              resizeMode="contain"
              source={{ uri: this.props.cuisData.cuisine_image }}
            />
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>{this.props.cuisData.cuisine_name}</Text>
          </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    name: {
        color: '#5a647d',
        fontWeight: 'bold',
        fontSize: 30
    },
    price: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    description: {
        color: '#c1c4cd'
    },
    divCategorie: {
        backgroundColor: "red",
        margin: 5,
        alignItems: "center",
        borderRadius: 10,
        padding: 10,
      },
});

export default Cuisine;
