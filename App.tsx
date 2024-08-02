if (__DEV__) require('react-native-devsettings');
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Alert, StyleSheet, Text, View, SafeAreaView, } from 'react-native';
import "react-native-devsettings";
import Ionicons from 'react-native-vector-icons/Ionicons'
import LoginScreen from './src/screens/LoginScreen';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductsScreen from './src/screens/ProductsScreen/index';
import CartScreen from './src/screens/CartScreen';
import UserScreen from './src/screens/UserScreen';
import { DARK_BLUE, LIGHT_BLUE } from './src/constants/colors';

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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'allProducts') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          }
          else if (route.name === 'user') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName as string} size={size} color={color} />;
        },
        tabBarActiveTintColor: DARK_BLUE,
        tabBarInactiveTintColor: 'gray',
      })}


    >
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

