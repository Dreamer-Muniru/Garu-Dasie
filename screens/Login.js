import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import {useWarmUpBrowser} from '../hooks/useWarmUpBrowser'
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);
   
    return (
        
        <View>
            <Image source={require('../assets/banner.jpg')}
            className="w-full h-[400px]"
            />
            <View className="p-8 bg-white rounded-3xl mt-[-20px] shadow-md">
                <Text className="font-bold text-[25px] text-center">Garu Dasie (MarketPlace)</Text>
                <Text className="text-center text-[20px] pt-5">Buy & Sale market place in Garu where you can sell anything and make money.</Text>
                {/* GetStarted  */}
                <TouchableOpacity onPress={onPress} className="p-4 bg-blue-500 rounded-full mt-20" >
                    <Text className="text-white text-center text-[20px]">GetStarted</Text>
                </TouchableOpacity>
            </View>
        </View> 
    )
}
