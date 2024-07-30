import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Alert, StyleSheet, Text, View, SafeAreaView, } from 'react-native';
import "react-native-devsettings";
import LoginScreen from './src/screens/LoginScreen';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  const [name, setName] = useState("");
  const buttonPressed = () => {
    console.log("Button pressed");
  }


  return (
    <PaperProvider>
      <LoginScreen />
    </PaperProvider>
  );
}


