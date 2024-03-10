import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function Categories({categoryList}) {
    const navigation = useNavigation()
    return (
        <View>
            <Text style={styles.heading}>Categories</Text>
            <FlatList
                data={categoryList}
                numColumns={4}
                renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() =>navigation.navigate('item-list',{
                    category:item.name
                })} 
                    style={styles.category_dev}>
                    <Image
                    source={{ uri: item.icon }} 
                    style={styles.categoryIcons}
                    />
                    <Text style={styles.categoryName}>{item.name}</Text> 
                </TouchableOpacity>
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
        width: 40,
        height: 40,
        // borderWidth: 2,
        // borderRadius: 50,
        // borderColor: '#ccc',
        // marginLeft: 15,
        // marginVertical: 5
        
    },
    categoryName:{
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        alignItems: 'center',
    },
    category_dev:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 5,
        borderWidth: 1,
        borderColor: 'grey',
        margin: 3,
        borderRadius: 10
        

    }
});
