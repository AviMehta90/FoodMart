import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { View } from 'react-native-animatable';
import { Card, Button } from 'react-native-elements';
import colors from '../../assets/colors/colors';

class Cuisine extends React.Component {


    render() {
      // const navigation = this.props.navigation;
        return (

          <View style={styles.cuisinesItemWrapper}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DishesScreen')}
          >
            <Image
              style={styles.cuisineImage}
              source={{ uri: this.props.cuisData.cuisine_image }}
            />
            <Text style={styles.cuisineItemTitle}>{this.props.cuisData.cuisine_name}</Text>
            <View style={styles.cuisineSelectWrapper}>
              <Feather name={'chevron-right'} size={20} style={styles.cuisineSelectIcon}/>
            </View>
          </TouchableOpacity>
          </View>
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
    cuisineImage: {
      width: 80,
      height: 80,
      marginTop: 24,
      alignSelf: 'center',
      borderRadius: 20,
      marginHorizontal: 20
    },
    cuisinesItemWrapper: {
      backgroundColor: colors.secondary,
      marginRight: 20,
      borderRadius: 20,
      marginBottom: 20,
      shadowColor: '#171717',
      elevation: 3,
      shadowOffset: {width: 2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },

    cuisineItemTitle: {
      textAlign: 'center',
      fontFamily: 'monsterMed',
      fontSize: 14,
      marginTop: 10,
    },
    cuisineSelectWrapper: {

      alignSelf: 'center',
      justifyContent: 'center',
      marginTop: 20,
      width: 40,
      height: 40,
      borderRadius: 40,
      backgroundColor: colors.primary,
      marginBottom: 20,
    },
    cuisineSelectIcon: {
      alignSelf: 'center',
      color: '#FFFFFF'
    },
});

export default Cuisine;
