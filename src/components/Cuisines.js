import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';

class Cuisine extends React.Component {


    render() {
      // const navigation = this.props.navigation;
        return (

          <TouchableOpacity
            style={[styles.divCategorie, { backgroundColor: "grey" }]}
            onPress={() => this.props.navigation.navigate('DishesScreen')}
          >
            <Image
              style={{ width: 100, height: 80 }}
              resizeMode="contain"
              source={{ uri: this.props.cuisData.cuisine_image }}
            />
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>{this.props.cuisData.cuisine_name}</Text>
          </TouchableOpacity>
            // <Card>
            //     <Card.Image
            //         source = {{uri: this.props.cuisData.cuisine_image}}
            //     />
            //     <Text style={{marginBottom: 10, marginTop: 20 }} h2>
            //         {this.props.cuisData.cuisine_name}
            //     </Text>
            //     <Text style={styles.price} h4>
            //         Dishes: {this.props.cuisData.dish_count}
            //     </Text>
            //     <Text h4 style={styles.description}>
            //         blah blah blah!!!
            //     </Text>
            //     <Button
            //         type="clear"
            //         title='Explore'
            //         onPress={() => this.props.navigation.navigate('DishesScreen')}
            //     />
            // </Card>
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
