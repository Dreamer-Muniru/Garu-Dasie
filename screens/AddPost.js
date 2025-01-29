import React, {useEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity, ToastAndroid, ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import { app } from '../firebase/firebaseConfig'
import {collection, addDoc, getFirestore, getDocs} from 'firebase/firestore'
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo'

export default function AddPost() {
    const [categoryList, setCategoryList] = useState([]);
    const [image, setImage] = useState(null);
    const db = getFirestore(app);
    const storage = getStorage( )
    const {user}=useUser()
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        getCategoryList();
    },[])

    // Categories List
    const getCategoryList=async()=>{
        setCategoryList([]);
        const querySnapshot = await getDocs(collection(db, 'Category'));
        querySnapshot.forEach((doc)=>{
            // console.log("Docs:", doc.data());
            setCategoryList(categoryList =>[...categoryList, doc.data()])
        })
    }
    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });
    
        // console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

      const onSubmitMethod= async(value)=>{
        setLoading(true)
        // Converting url to blob file
        const resp = await fetch(image);
        const blob = await resp.blob();

        const storageRef = ref(storage, 'garuDasie/'+Date.now()+".jpg")
        uploadBytes(storageRef, blob).then((snapshot) =>{
            // console.log('Uploaded a blob or file')
        }).then((resp)=>{
            getDownloadURL(storageRef).then(async(getDownloadURL) =>{
                // console.log(getDownloadURL);
                value.image=getDownloadURL;
                value.userName = user.fullName;
                value.userEmail = user.primaryEmailAddress.emailAddress;
                value.userImage = user.imageUrl;

                // Adding document to firebase
                const docRef = await addDoc(collection(db, "userPost"), value)
                if(docRef.id)
                {
                    setLoading(false)
                    Alert.alert('Success!!!', 'Post Added Successfully')
                }
            })
        })

      }
    return (
        <KeyboardAvoidingView>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Add Post</Text>
                <Text className="text-center text-[16px] pt-2 text-grey-500 mb-2">Add a new post and start making money now!</Text>
                {/* Adding formik @formik.org */}
                <Formik initialValues={{title: '', category:'', desc:'', price:'', address:'', image: '', userName: '', 
                    userEmail: '', userImage: '', createAt: Date.now(),
                }}
                onSubmit={value =>onSubmitMethod(value)}
                validate={(values) =>{
                    const errors ={}
                    if(!values.title){
                        console.log("Title not present")
                        ToastAndroid.show('Please Add the title', ToastAndroid.SHORT)
                        errors.name = "Please add the title"
                    }
                    return errors
                }}
                >
                    {({handleChange, handleBlur, handleSubmit, values, setFieldValue, errors})=>(
                        <View>
                            <TouchableOpacity onPress={pickImage}>
                            {image? 
                                <Image source={{uri:image}} style={{width: 100, height: 100, borderRadius: 8}}/>
                            : <Image source={require('../assets/placeholder.jpg')} 
                                    style={{width: 100, height: 100, borderRadius: 10}}
                                />
                            }   
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
                            <TouchableOpacity onPress={handleSubmit} style={{backgroundColor:loading?'#ccc':'blue'}} disabled={loading} 
                                className="p-2 mt-3 bg-blue-500 rounded-full">
                            {loading? <ActivityIndicator color='green'/> 
                            : 
                                <Text className="text-center text-white text-[18px]">Submit</Text> 
                            } 
                            </TouchableOpacity>
                    
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 30
    },
    input:{
        borderWidth: 1,
        borderRadius: 8,
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