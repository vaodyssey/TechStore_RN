if (__DEV__) require('react-native-devsettings');
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Alert, StyleSheet, Text, View, SafeAreaView, } from 'react-native';
import "react-native-devsettings";
import LoginScreen from './src/screens/LoginScreen';
import { PaperProvider } from 'react-native-paper';
import ProductsScreen from './src/screens/ProductsScreen';

export default function App() {
  const [name, setName] = useState("");
  const buttonPressed = () => {
    console.log("Button pressed");
  }

  return (
    <PaperProvider>
      <ProductsScreen />
    </PaperProvider>
  );
}


