if (__DEV__) require('react-native-devsettings');
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Alert, StyleSheet, Text, View, SafeAreaView, } from 'react-native';
import "react-native-devsettings";
import LoginScreen from './src/screens/LoginScreen';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductsScreen from './src/screens/ProductsScreen/index';
import CartScreen from './src/screens/CartScreen';
import UserScreen from './src/screens/UserScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="productDetails"
            component={ProductDetailsScreen}
            options={{
              title: 'Product Details',
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="allProducts" component={ProductsScreen} options={{
        title: 'Products',
      }} />
      <Tab.Screen name="cart" component={CartScreen} options={{
        title: 'My Cart',
      }} />
      <Tab.Screen name="user" component={UserScreen} options={{
        title: 'My Profile',
      }} />
    </Tab.Navigator>
  );
}

