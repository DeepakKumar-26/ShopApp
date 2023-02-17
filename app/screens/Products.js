import {
  FlatList,
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

import DATA from '../data';
import RenderProductSectionHeader from '../components/RenderProductSectionHeader';

const ListHeaderComponent = () => {
  return (
    <View style={styles.container__shopDetails}>
      <Text style={styles.text__shopName}>Hi-Fi Shop & Service</Text>
      <Text>Audio shop on Rustaveli Ave 57.</Text>
      <Text>This shop offers both products and services</Text>
    </View>
  );
};

export default function Products({navigation}) {
  return (
    <View style={styles.container}>
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={DATA}
        ListHeaderComponent={<ListHeaderComponent />}
        keyExtractor={(item, index) => item + index}
        renderItem={() => null}
        renderSectionHeader={({section}) => (
          <RenderProductSectionHeader section={section} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  container__shopDetails: {
    paddingVertical: 5,
  },
  text__shopName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 5,
  },
});
