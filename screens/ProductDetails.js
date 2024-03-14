import React, {useEffect, useState} from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'

export default function ProductDetails({}) {
    const params = useRoute();
    const [product, setProduct] = useState([])
    useEffect(() => {
        params&&setProduct(params.product)
    },[params])

    return (
        <View>
            <Text>Product Details</Text>
            <Image source={{uri:product.image}} 
                style={styles.product_image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    product_image:{
        width: 200,
        height: 200,

    }
});