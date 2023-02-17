import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ShowAllProducts({navigation, route}) {
  const {section} = route.params;
  return (
    <View style={{paddingHorizontal: 10,width:'100%'}}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>
        {section.productType}
      </Text>
      <FlatList
        data={section.data}
        numColumns={2}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetails', {product: item})
            }
            style={{
              backgroundColor: 'white',
              width: '49%',
              borderRadius: 10,
              paddingBottom: 10,
              marginVertical:5
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
        )}
        columnWrapperStyle={{
            justifyContent: "space-between"
          }}  
      />
    </View>
  );
}

const styles = StyleSheet.create({});
