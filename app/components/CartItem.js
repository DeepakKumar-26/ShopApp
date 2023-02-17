import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getData, storeData} from '../screens/utils/AsyncStorage';

export default function CartItem({
  product,
  cartItems,
  calculateCosts,
  handleDeleteItem,
}) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [cartData, setCartData] = useState([]);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
    // updateCartItems();
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      // updateCartItems();
    }
  };

  const updateCartItems = async () => {
    let data = cartItems;

    data = data.map(item => {
      if (item.id == product.id) {
        console.log(item.quantity);
        return {...item, quantity: quantity};
      } else {
        return item;
      }
    });
    setCartData(data);
    await storeData('cart', data);
    calculateCosts(data);
  };

  useEffect(() => {
    updateCartItems();
  }, [quantity]);
  return (
    <View
      style={{
        height: 130,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginVertical: 5,
      }}>
      <View
        style={{
          height: '100%',
          aspectRatio: 1,
          backgroundColor: 'lightgrey',
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <Image
          resizeMode="contain"
          source={{uri: product.product_thumbnail}}
          style={{height: '100%', aspectRatio: 1}}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginLeft: 10,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text numberOfLines={2} style={{fontWeight: 'bold', marginBottom: 5}}>
            {product.name}
          </Text>
          <Text numberOfLines={1}>${product.price}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={handleDecreaseQuantity}
              style={{
                borderRadius: 100,
                borderWidth: 0.5,
                height: 30,
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="minus" size={25} />
            </TouchableOpacity>
            <Text style={{marginHorizontal: 20}}>{quantity}</Text>
            <TouchableOpacity
              onPress={handleIncreaseQuantity}
              style={{
                borderRadius: 100,
                borderWidth: 0.5,
                height: 30,
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="plus" size={25} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => handleDeleteItem(product)}
            style={{
              backgroundColor: 'lightgrey',
              borderRadius: 100,
              height: 30,
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="delete-outline" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
