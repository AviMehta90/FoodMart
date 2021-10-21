import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation';
import Cuisine from '../components/Cuisines'
import axios from "axios";
import { Button } from 'react-native-elements';

class HomeScreen extends React.Component {

  constructor(props){

    super(props);

    this.state = {
      cuisines: []
    }

    axios.get('https://88b5-45-112-145-178.ngrok.io/api/cuisines/')
      .then(res => {
        const cuisines = res.data;
        this.setState({ cuisines });
      });

    }

    render() {
        let cuisines = this.state.cuisines;
        // console.log(cuisines);
        const { navigation } = this.props;
        return (
          <ScrollView
            style={{
              flexGrow: 0,
              width: "100%",
              height: "100%",
            }}>
            {cuisines.map((cdata) => {
              return (
                <Cuisine cuisData={cdata} key={cdata.cuisine_name} navigation={navigation}/>
              );
            })}
            {/* <Button
            title="Go to Dishes Screen"
            onPress={() => this.props.navigation.navigate('DishesScreen')}
            /> */}
          </ScrollView>
        );
    }
}

export default withNavigation(HomeScreen);
