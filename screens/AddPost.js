import React, {useEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import { app } from '../firebase/firebaseConfig'
import {collection, getDocs, getFirestore} from 'firebase/firestore'
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'

export default function AddPost() {
    const [categoryList, setCategoryList] = useState([]);
    const db = getFirestore(app);
    useEffect(()=>{
        getCategoryList();
    },[])

    const getCategoryList=async()=>{
        setCategoryList([]);
        const querySnapshot = await getDocs(collection(db, 'Category'));
        querySnapshot.forEach((doc)=>{
            console.log("Docs:", doc.data());
            setCategoryList(categoryList =>[...categoryList, doc.data()])
        })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add Post</Text>
            <Text className="text-center text-[16px] pt-2 text-grey-500 mb-2">Add a new post and start making money now!</Text>
            {/* Adding formik @formik.org */}
            <Formik initialValues={{title: '', category:'', desc:'', price:'', address:'', image: ''}}
            onSubmit={value =>console.log(value)}
            >
                {({handleChange, handleBlur, handleSubmit, values, setFieldValue})=>(
                    <View>
                        <TouchableOpacity>
                            <Image source={require('../assets/placeholder.jpg')} 
                                style={{width: 100, height: 100, borderRadius: 10}}
                            />
                        </TouchableOpacity>
                        <TextInput style={styles.input} placeholder='Title'
                            value={values?.title} onChangeText={handleChange('title')}
                         />

                        <TextInput style={styles.input} placeholder='Description'
                            value={values?.desc} onChangeText={handleChange('desc')}
                            numberOfLines={5}
                         />

                        <TextInput style={styles.input} placeholder='Price'
                            value={values?.price} onChangeText={handleChange('price')}
                            keyboardType='number-pad'
                         />
                        <TextInput style={styles.input} placeholder='Address'
                            value={values?.address} onChangeText={handleChange('address')}
                         />
                        {/* Category Dropdown using Picker Expo  */}
                        <View style={{borderWidth: 1, borderRadius: 10, marginTop: 10}}>
                            <Picker selectedValue={values?.category}
                                onValueChange={itemValue=>setFieldValue('category', itemValue)}
                            >
                                {categoryList&&categoryList.map((item, index) =>(
                                    <Picker.Item key={index} label={item.name} value={item.name} />
                                ))}
                                
                            </Picker>
                        </View>
                        <TouchableOpacity onPress={handleSubmit} className="p-2 mt-5 bg-blue-500 rounded-full">
                            <Text className="text-center text-white text-[18px]">Submit</Text>
                        </TouchableOpacity>
                
                    </View>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 30
    },
    input:{
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        paddingTop: 20,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 17,
        fontSize: 17,
        textAlignVertical: 'top'
    },
    header:{
       fontSize: 30,
       fontWeight: 'bold',
       textAlign: 'center'

    }
});