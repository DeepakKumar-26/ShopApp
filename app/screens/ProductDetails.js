import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button';
import {getData, storeData} from './utils/AsyncStorage';
import {useFocusEffect} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

export default function ProductDetails({navigation, route}) {
  const {product} = route.params;
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    const cartResp = await getData('cart');
    if (cartResp) {
      setCartItems(cartResp);
    }
  };

  const updateCartItems = async data => {
    await storeData('cart', data);
    navigation.navigate('Cart');
  };

  const handleAddToCart = async product => {
    const itemExist = cartItems.find(data => data.id == product.id);
    let data = cartItems;
    if (itemExist) {
      console.log('Item Already Exists');

      data = cartItems.map(item => {
        if (item.id === product.id) {
          return {...item, quantity: item.quantity + 1};
        } else {
          return item;
        }
      });
    } else {
      console.log('There is no item in cart');
      data.push({...product, quantity: 1});
    }
    updateCartItems(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCartItems();
    }, []),
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Corousal */}
      <View style={styles.container__corousal}>
        <FlatList
          data={product.product_images}
          horizontal
          pagingEnabled
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <Image
              resizeMode="contain"
              source={{
                uri: item,
              }}
              style={styles.corousalImage}
            />
          )}
        />
      </View>

      {/* Product Details section */}
      <View style={styles.details}>
        <View>
          {/* Shopping Icon and Shopping Text */}
          <View style={styles.shoppingTextAndIcon}>
            <Icon name="cart" size={25} color="blue" />
            <Text style={{color: 'blue'}}>Shopping</Text>
          </View>

          {/* Product Name and Link */}
          <View style={styles.container__productName}>
            <Text numberOfLines={1} style={styles.text__productName}>
              {product.name}
            </Text>
            <TouchableOpacity
              onPress={() => alert('Link is copied')}
              style={styles.container__linkIcon}>
              <Icon name="link" size={30} color="blue" />
            </TouchableOpacity>
          </View>

          {/* Shop Details */}
          <Text>Hi-Fi Shop & Service Rustaveli Ave 57.</Text>
          <Text>This shop offers both products and services</Text>

          {/* Delivery Location */}
          <TouchableOpacity style={styles.container__deliveryLocation}>
            <Icon
              name="map-marker"
              size={20}
              color="blue"
              style={styles.icon__mapMarker}
            />
            <View style={{flex: 1, marginHorizontal: 10}}>
              <Text>Rustaveli Ave 57</Text>
              <Text>17-001, Batumi</Text>
            </View>
            <Icon name="chevron-right" size={30} />
          </TouchableOpacity>

          {/* Horizontal Line */}
          <View style={styles.horizontalLine}></View>

          {/* Product Price and Tax rate */}
          <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
            ${product.price}
          </Text>
          <Text>Tax rate 2%</Text>
        </View>

        {/* Button Add To Cart */}
        <Button title="Add To Cart" onPress={() => handleAddToCart(product)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container__corousal: {
    backgroundColor: 'lightgrey',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    overflow: 'hidden',
  },
  container__productName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
  container__linkIcon: {
    backgroundColor: '#C7E3E6',
    padding: 10,
    borderRadius: 100,
  },
  container__deliveryLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container__button: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 50,
    marginVertical: 20,
  },
  corousalImage: {
    height: 300,
    flexGrow: 1,
    width: width,
  },
  details: {
    paddingHorizontal: 20,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  shoppingTextAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  text__productName: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  icon__mapMarker: {
    backgroundColor: 'lightgrey',
    padding: 15,
    borderRadius: 5,
  },
  horizontalLine: {
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    marginVertical: 10,
  },
});
