import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import RenderProductItem from './RenderProductItem';

export default function RenderProductSectionHeader({section}) {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
            {section.productType}
          </Text>
          <Text style={{marginHorizontal: 5}}>{section.data.length}</Text>
        </View>
        <Text
          onPress={() => navigation.navigate('ShowAllProducts', {section})}
          style={{color: 'blue'}}>
          Show all
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {section.data.slice(0, 2).map(item => (
          <RenderProductItem key={item.id} item={item} />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
