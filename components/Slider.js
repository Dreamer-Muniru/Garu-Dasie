import React from 'react'
import { View, Text, Image, StyleSheet, FlatList } from 'react-native'

export default function Slider({sliderList}) {
    return (
        <View>
            <FlatList
                data={sliderList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                <View>
                    <Image
                    source={{ uri: item?.image }}
                    style={styles.sliderImage}
                    />
                </View>
                )}
                keyExtractor={(item, index) => index.toString()}
      />
        </View>
    )
}

const styles = StyleSheet.create({
    sliderImage:{
        width: 400,
        marginTop: 20,
        height: 150,
        marginRight: 20,
        

    }
});