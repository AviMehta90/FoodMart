import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class Cuisine extends React.Component {
    

    render() {
        return (
            <Card>
                <Card.Image
                    source = {{uri: this.props.cuisData.cuisine_image}}
                />
                <Text style={{marginBottom: 10, marginTop: 20 }} h2>
                    {this.props.cuisData.cuisine_name}
                </Text>
                <Text style={styles.price} h4>
                    Dishes: {this.props.cuisData.dish_count}
                </Text>
                <Text h4 style={styles.description}>
                    blah blah blah!!!
                </Text>
                <Button
                    type="clear"
                    title='Explore'
                    onPress={() => this.props.navigation.navigate('DishesScreen')}
                />
            </Card>
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
    }
});

export default withNavigation(Cuisine);