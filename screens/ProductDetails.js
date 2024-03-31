import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Share, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing'

export default function ProductDetails({navigation}) {
  const route = useRoute();
  const [product, setProduct] = useState({}); 

  useEffect(() => {
    if (route.params && route.params.product) {
      setProduct(route.params.product);
      shareButton()
    }
}, [route.params, navigation]);

// Sending message to the seller
    const sendEmailMessage =()=>{ 
        const subject = 'Regarding' + product.title
        const body = "Hi "+ product.userName + "\n" + "I am Interested in this product"
        Linking.openURL('mailto:'+ product.userEmail +"?subject="+subject + "&body="+body);
    }

    // Share Button
    const shareButton = () => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => shareProduct()}>
                    <Ionicons name="share-social" size={24} color="white" style={{ marginRight: 15 }} />
                </TouchableOpacity>
            ),
        });
    };
    
    // Sharing the product to other social media
    const shareProduct = ()=>{
        const content ={
            message: product?.title + "\n" + product?.desc
        }
        Share.share(content).then(resp=>{
            console.log(resp)
        },(error) =>{
            console.log(error)
        })
    }

  return (
    <ScrollView className="bg-white">
     {/* Check if product.image exists before rendering the Image component */}
      {product.image && ( 
        <Image
          source={{ uri: product.image }}
          className="h-[300px] w-full"
          resizeMode="cover"
        />
      )}

      <View className="p-3">
        <Text className="font-bold text-[18px]">{product.title}</Text>
        <View className="items-baseline">
            <Text className="bg-blue-200 rounded-full px-2 p-1 mt-2 text-blue-500">{product.category}</Text>
        </View>
        <Text className="font-bold text-[16px] mt-2">Description</Text>
        <Text className="text-[14px] text-gray-500">{product.desc}</Text>
      </View>

      {/* User Info */}
      <View className="p-3 flex  flex-row items-center, gap-2 bg-blue-100 border-gray-400">
        <Image source={{uri:product.userImage}} 
        className="h-[40] w-[50] rounded-full"  />
        <View>
            <Text className="font-bold text-[18px]">{product.userName}</Text>
            <Text className="text-gray-500">{product.userEmail}</Text>
        </View>
      </View>
      {/* Message Button */}
       <TouchableOpacity onPress={() =>sendEmailMessage()} className="z-40 bg-blue-500 mt-5 w-full rounded-full p-3">
            <Text className="text-white text-center">Send</Text>
       </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  product_image: {
    width: 200,
    height: 200,
  },

});
