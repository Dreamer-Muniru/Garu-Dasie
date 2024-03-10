import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import ItemList from '../screens/ItemList';

export default function StackNavigation() {
    const Stack = createStackNavigator();
    
    return (
        <Stack.Navigator>
            <Stack.Screen name='home' component={Home} 
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='item-list' component={ItemList}
                options={({route}) => ({title: route.params.category})}
             />

        </Stack.Navigator>
    )
}
