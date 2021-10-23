import React from 'react';
import { ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import Dishes from '../components/Dishes';
import axios from "axios";

class DishScreen extends React.Component {

  constructor(props){

    super(props);

    axios.get('https://bhavya3.pythonanywhere.com/api/dishes/')
      .then(res => {
        const dishes = res.data;
        this.setState({ dishes });
      });

      this.state = {
        dishes: []
      }
    }

    render() {
        let dishes = this.state.dishes;
        const { navigation } = this.props;
        return (
            <ScrollView
                style={{
                    flexGrow: 0,
                    width: "100%",
                    height: "100%",
                }}>
                {
                    dishes.map((ddata) => {
                        return(
                            <Dishes dishData={ddata} key={ddata.dish_name} navigation={navigation}/>
                        );
                    })
                }
            </ScrollView>
        );
    }
}

export default withNavigation(DishScreen);
