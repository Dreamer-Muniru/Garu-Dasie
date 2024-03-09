import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import Header from '../components/Header'
import Slider from '../components/Slider'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { app } from '../firebase/firebaseConfig'
import Categories from '../components/Categories'

export default function Home() {
    const db = getFirestore(app)
    const [sliderList, setSliderList] =useState([])
    const [categoryList, setCategoryList] = useState([])

    useEffect(() =>{
        getSliders()
        getCategoryList()
    },[])
    // Displaying slider
    const getSliders = async()=>{
        setSliderList([])
        const querySnapShot =await getDocs(collection(db, "sliders"));
        querySnapShot.forEach((doc) =>{
            console.log(doc.id, "=>", doc.data());
            setSliderList(sliderList =>[...sliderList, doc.data()])
        })
    }

    // Categories List
    const getCategoryList=async()=>{
        setCategoryList([]);
        const querySnapshot = await getDocs(collection(db, 'Category'));
        querySnapshot.forEach((doc)=>{
            console.log("Docs:", doc.data());
            setCategoryList(categoryList =>[...categoryList, doc.data()])
        })
    }


    return (
        <View className="py-8 px-6">
        {/* Header Component */}
            <Header />
        {/* Sliders */}
            <Slider sliderList={sliderList} /> 
            {/* Category List */}
            <Categories categoryList={categoryList}/>
        </View>
    )
}
