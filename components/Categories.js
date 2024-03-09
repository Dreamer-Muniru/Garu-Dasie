import React from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'

export default function Categories({categoryList}) {
    return (
        <View>
            <Text style={styles.heading}>Categories</Text>
            <FlatList
                data={categoryList}
                numColumns={4}
                renderItem={({ item, index }) => (
                <View>
                    <Image
                    source={{ uri: item.icon }}
                    style={styles.categoryIcons}
                    />
                </View>
                )}
                keyExtractor={(item, index) => index.toString()}
      />
        </View>
    )
}

const styles = StyleSheet.create({
    heading:{
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    categoryIcons:{
        width: 80,
        height: 80,
    }
});
