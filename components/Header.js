import React from 'react'
import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
    const {user}=useUser()
    return (
        <View>
            {/* User Profile */}
            <View style={styles.container}>
            <Image source={{uri:user?.imageUrl}}
                style={styles.profileImage}
            />

            <View>
                <Text style={styles.welcome} >Welcome</Text>
                <Text style={styles.userName}>{user?.fullName}</Text>
             
            </View>
        </View>

        {/* Search Bar Section */}
        <View style={styles.searchBar}>
            <Ionicons name="search" size={24} color="black" />
            <TextInput placeholder='Search' style={styles.searchInput} />
        </View>

        </View>
    )
}

const styles = StyleSheet.create({
    profileImage:{
        width: 40,
        height: 40,
        borderRadius: 100
    },
    container:{
        display: 'flex',
        flexDirection: 'row',
        gap: 5
    },
    welcome:{
        fontSize: 16
    },
    userName:{
        fontWeight: 'bold',
        fontSize: 18
    },
    searchBar:{
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        paddingBottom: 10,
        backgroundColor: 'lightblue',
        borderRadius: 20,
        marginTop: 10
    },
    searchInput:{
        fontSize: 18,
        padding: 1,
        paddingLeft: 5,
    }

});