import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import{ AuthContext } from '../components/context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ProfileScreen = () => {

  const { signOut } = React.useContext(AuthContext);

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => signOut()}>
          <Icon
            name="exit-to-app"
            size={26}
            color="black"
          />
        </TouchableOpacity>
      </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
