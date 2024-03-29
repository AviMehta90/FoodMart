import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { View } from 'react-native-animatable';
import { Card, Button } from 'react-native-elements';
import colors from '../../assets/colors/colors';

class Cuisine extends React.Component {


    render() {
        return (

          <View style={styles.cuisinesItemWrapper}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DishesScreen', {cuisine_id: this.props.cuisData.id})}
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
