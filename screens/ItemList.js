import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../firebase/firebaseConfig';
import LatestItemList from '../components/LatestItemList';


export default function ItemList() {
    const {params} = useRoute();
    const db = getFirestore(app)
    const [itemList, setItemList] = useState([])
    useEffect(() =>{
       params&&getItemListCategory();
    },[params])

    const getItemListCategory = async() =>{
        setItemList([]);
        const q =query(collection(db, 'userPost'), where('category', '==', params.category ));
      
        const snapshot = await getDocs(q);
        snapshot.forEach(doc =>{
            console.log(doc.data())
            setItemList(itemList =>[...itemList,doc.data()]);
        })
    }
    return (
        <View style={{padding: 10}}>
            {itemList?.length>0? <LatestItemList latestItemList={itemList} 
                heading={''}
            />: 
            <Text style={{textAlign: 'center', fontSize: 18, marginTop: 60, color: 'grey' }}>No post Found</Text>
            }
        </View>
    )
}
