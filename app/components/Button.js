import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function Button({title, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 50,
        marginVertical: 20,
      }}>
      <Text style={{textTransform: 'uppercase', color: 'white'}}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
