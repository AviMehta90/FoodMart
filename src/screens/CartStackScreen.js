import React from 'react';

import { createNativeStackNavigator } from "@react-navigation/native-stack";


import CartScreen from './CartScreen';
import Payment from './Payment';

const CartStack = createNativeStackNavigator();

function CartStackScreen() {
  return (
      <CartStack.Navigator headerMode='none' screenOptions={{ headerShown: false }}>
          <CartStack.Screen name="CartScreen" component={CartScreen}/>
          <CartStack.Screen name="Payment" component={Payment}/>
      </CartStack.Navigator>
  )
}

export default CartStackScreen;
