import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Explore from '../screens/Explore';
import Home from '../screens/Home';
import AddPost from '../screens/AddPost';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
       
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={Home} 
            options={{
                tabBarLabel:({color})=>(
                    <Text style={{color: color, fontSize: 16, marginBottom: 3}}>Home</Text>
                ),
                tabBarIcon:(color, size)=>(
                    <Ionicons name="home" size={24} color={color} />
                )
            }} />

            <Tab.Screen name="Explore" component={Explore} 
                options={{
                tabBarLabel:({color})=>(
                    <Text style={{color: color, fontSize: 16, marginBottom: 3}}>Explore</Text>
                ),
                tabBarIcon:(color, size)=>(
                    <Ionicons name="search" size={24} color={color} />
                )
            }}
            />

            <Tab.Screen name="AddPost" component={AddPost} 
                options={{
                tabBarLabel:({color})=>(
                    <Text style={{color: color, fontSize: 16, marginBottom: 3}}>AddPost</Text>
                ),
                tabBarIcon:(color, size)=>(
                    <Ionicons name="camera" size={24} color={color} />
                )
            }}
            />

            <Tab.Screen name="Profile" component={Profile} 
                options={{
                tabBarLabel:({color})=>(
                    <Text style={{color: color, fontSize: 16, marginBottom: 3}}>Profile</Text>
                ),
                tabBarIcon:(color, size)=>(
                    <Ionicons name="person-circle" size={24} color={color} />
                )
            }}
            />

        </Tab.Navigator>
    )
}
