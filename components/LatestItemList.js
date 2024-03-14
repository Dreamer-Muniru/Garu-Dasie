import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import PostItems from './PostItems';

export default function LatestItemList({ latestItemList, heading }) {
  return (
    <View style={styles.container}>
       
      <Text>{heading}</Text>
      <FlatList
        data={latestItemList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <PostItems item={item} />
        )}
        keyExtractor={(item, index) => index.toString()} 
        ListFooterComponent={<View style={{ marginBottom: 100 }} />}
      />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
 
});
