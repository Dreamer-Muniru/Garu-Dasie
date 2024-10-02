import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import {ClerkProvider, SignedIn, SignedOut} from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Navigations/TabNavigation';

export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_YmV0dGVyLXNwYXJyb3ctMzcuY2xlcmsuYWNjb3VudHMuZGV2JA'>
   
      <StatusBar style='grey' />6
      <NavigationContainer>
        <SignedIn>
          <TabNavigation/>
        </SignedIn>
        <SignedOut>
          <Login/>
        </SignedOut>
      </NavigationContainer>
    

 
  </ClerkProvider>

  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
