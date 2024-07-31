if (__DEV__) require('react-native-devsettings');
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Alert, StyleSheet, Text, View, SafeAreaView, } from 'react-native';
import "react-native-devsettings";
import LoginScreen from './src/screens/LoginScreen';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import ProductsScreen from './src/screens/ProductsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  const [name, setName] = useState("");
  const buttonPressed = () => {
    console.log("Button pressed");
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Products"
            component={ProductsScreen}
            options={{
              title: 'All Products',
              headerBackVisible: false
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{
              title: 'Product Details',
              headerBackVisible: true
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}


