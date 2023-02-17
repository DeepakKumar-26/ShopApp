import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RenderProductItem({item}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', {product: item})}
      style={{
        backgroundColor: 'white',
        width: '49%',
        borderRadius: 10,
        paddingBottom: 10,
        marginVertical: 5,
      }}>
      <View
        style={{
          height: 120,
          borderRadius: 10,
          backgroundColor: '#E2E9F3',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
        <Image
          source={{uri: item.product_thumbnail}}
          resizeMode="contain"
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>
      <Text
        numberOfLines={2}
        style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
        {item.name}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="circle-small"
          size={20}
          color={item.available ? 'green' : 'red'}
        />
        <Text style={{color: item.available ? 'green' : 'red'}}>
          {item.available ? 'Available' : 'Unavailable'}
        </Text>
      </View>
      <Text>$ {item.price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
