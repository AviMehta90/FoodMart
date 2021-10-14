import React from 'react';
import { ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import Dishes from '../components/Dishes';
import axios from "axios";

class DishScreen extends React.Component {

  constructor(props){
    
    super(props);

    axios.get('https://957e-45-112-145-130.ngrok.io/api/dishes/')
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
                            <Dishes dishData={ddata} key={ddata.cuisine_name}/>
                        );
                    })
                }
            </ScrollView>
        );
    }
}

export default withNavigation(DishScreen);