import React, {useEffect, useState} from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../firebase/firebaseConfig';
import LatestItemList from '../components/LatestItemList';


export default function ItemList() {
    const {params} = useRoute();
    const db = getFirestore(app)
    const [itemList, setItemList] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() =>{
       params&&getItemListCategory();
    },[params])

    const getItemListCategory = async() =>{
        setItemList([]);
        setLoading(true)
        const q =query(collection(db, 'userPost'), where('category', '==', params.category ));
      
        const snapshot = await getDocs(q);
        setLoading(false)
        snapshot.forEach(doc =>{
            // console.log(doc.data())
            setItemList(itemList =>[...itemList,doc.data()]);
            setLoading(false)
        })
    }
    return (
        <View style={{padding: 10}}>
        {loading?
            <ActivityIndicator size={'large'} color={'#3b82f6'} />
            :
            itemList?.length>0? <LatestItemList latestItemList={itemList} 
                heading={''}
            /> 
            : <Text style={{textAlign: 'center', fontSize: 18, marginTop: 60, color: 'grey' }}>No post Found</Text>
        }
            
        </View>
    )
}
