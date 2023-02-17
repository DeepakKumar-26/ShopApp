import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Products from '../screens/Products';
import ProductDetails from '../screens/ProductDetails';
import Cart from '../screens/Cart';
import ShowAllProducts from '../screens/ShowAllProducts';

const Stack = createNativeStackNavigator();
export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{title: 'Product Details'}}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{title: 'Order Details'}}
      />
      <Stack.Screen name="ShowAllProducts" component={ShowAllProducts} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
