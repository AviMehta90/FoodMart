import React from 'react';
import { ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import Cuisine from '../components/Cuisines'
import axios from "axios";

class HomeScreen extends React.Component {

  constructor(props){
    
    super(props);

    axios.get('https://957e-45-112-145-130.ngrok.io/api/cuisines/')
      .then(res => {
        const cuisines = res.data;
        this.setState({ cuisines });
      });

      this.state = {
        cuisines: []
      }
    }

    render() {
        let cuisines = this.state.cuisines;
        return (
            <ScrollView
                style={{
                    flexGrow: 0,
                    width: "100%",
                    height: "100%",
                }}>
                {
                    cuisines.map((cdata) => {
                        return(
                            <Cuisine cuisData={cdata} key={cdata.cuisine_name}/>
                        );
                    })
                }
            </ScrollView>
        );
    }
}

export default withNavigation(HomeScreen);