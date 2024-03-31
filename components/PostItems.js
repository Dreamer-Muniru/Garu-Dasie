import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

export default function PostItems({item}) {
  const navigation = useNavigation();
  
    return (
        <TouchableOpacity onPress={() => navigation.push('product-detail',
         {
          product: item
         })} 
         style={styles.product_dev}
          
          >
            <Image source={{ uri: item.image }} style={styles.product_image} />
            <View>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    product_dev:{
        flex: 1,
        margin: 5,
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#fff'
      },
      product_image: {
        width: 150,
        height: 140,
        borderRadius: 10,
      },
      title:{
        fontWeight: 'bold',
        fontSize: 16,
        
      },
      price:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'blue',
       
      },
      category:{
        backgroundColor: 'lightblue',
        width: 80,
        padding: 3,
        marginTop: 3,
        fontSize: 12,
        borderRadius: 10,
    
      }
});