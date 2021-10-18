import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class Dishes extends React.Component {

    render() {
        return (
            <Card>
                <Card.Image
                    source = {{uri: this.props.dishData.dish_image}}
                />
                <Text style={{marginBottom: 10, marginTop: 20 }} h2>
                    {this.props.dishData.dish_name}
                </Text>
                <Text style={styles.price} h4>
                    {this.props.dishData.category_name_raw}
                </Text>
                <Text style={styles.price} h4>
                    {this.props.dishData.dish_price}
                </Text>
                <Text h4 style={styles.description}>
                    blah blah blah!!!
                </Text>
                <Button
                    title='Go Back'
                    onPress={() => this.props.navigation.navigate('CuisineScreen')} 
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

export default withNavigation(Dishes);