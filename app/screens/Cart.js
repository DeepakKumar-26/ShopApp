import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CartItem from '../components/CartItem';
import Button from '../components/Button';
import {getData, storeData} from './utils/AsyncStorage';

export default function Cart({navigation, route}) {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(10);

  const ListFooter = () => {
    return (
      <>
        <Text style={{fontWeight: 'bold'}}>Delivery Location</Text>

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

        <Text style={{fontWeight: 'bold'}}>Payment Method</Text>

        <TouchableOpacity style={styles.container__paymentMethod}>
          <Image
            source={require('../assets/visa.png')}
            style={styles.image__visaCard}
          />
          <View style={{flex: 1, marginHorizontal: 10}}>
            <Text>VISA Classic</Text>
            <Text>****-0921</Text>
          </View>
          <Icon name="chevron-right" size={30} />
        </TouchableOpacity>
      </>
    );
  };
  const fetchcartItems = async () => {
    let subTotal = 0;
    const cartResp = await getData('cart');
    console.log(cartResp);
    setCartItems(cartResp);

    calculateCosts(cartResp);
  };

  const calculateCosts = param => {
    let subTotal = 0;
    param.map(item => {
      subTotal = subTotal + item.quantity * item.price;
    });
    console.log(param, subTotal);
    setSubTotal(subTotal);
    if (subTotal == 0) {
      setShippingCost(0);
      setTotal(0);
    } else {
      setTotal(subTotal + shippingCost);
    }
  };

  const handleDeleteItem = async item => {
    const newData = cartItems.filter(i => {
      return i.id !== item.id;
    });
    calculateCosts(newData);
    setCartItems(newData);
    await storeData('cart', newData);
  };

  useEffect(() => {
    fetchcartItems();
  }, []);

  if (cartItems.length < 1) {
    return (
      <View
        style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No Items In Cart</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{height: 400}}
        data={cartItems}
        keyExtractor={(item, index) => item + index}
        ListHeaderComponent={<Text style={styles.text__myCart}>My Cart</Text>}
        ListFooterComponent={<ListFooter />}
        renderItem={({item}) => (
          <CartItem
            product={item}
            cartItems={cartItems}
            calculateCosts={calculateCosts}
            handleDeleteItem={handleDeleteItem}
          />
        )}
      />

      <View>
        <Text style={{fontWeight: 'bold'}}>Order Info</Text>
        <View style={styles.container__priceDetails}>
          <Text>Subtotal</Text>
          <Text>${subTotal}</Text>
        </View>
        <View style={styles.container__priceDetails}>
          <Text>Shipping Cost</Text>
          <Text>+${shippingCost}</Text>
        </View>
        <View style={styles.container__priceDetails}>
          <Text>Total</Text>
          <Text style={{fontWeight: 'bold'}}>+${total}</Text>
        </View>

        <Button title={`CHECKOUT ($${total})`} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  container__deliveryLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container__paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container__priceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon__mapMarker: {
    backgroundColor: 'lightgrey',
    padding: 15,
    borderRadius: 5,
  },
  image__visaCard: {
    width: 50,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    aspectRatio: 1,
  },
  text__myCart: {fontSize: 18, fontWeight: 'bold', marginVertical: 10},
});
