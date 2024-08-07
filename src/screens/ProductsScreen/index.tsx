import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Alert, BackHandler, AlertButton } from "react-native";
import BrandSelector from "./brandsSelector";
import { containerStyles } from "../../components/styles";
import ProductsView, { ProductsViewRef } from './productsView';
import { SCREEN_HEIGHT } from "../../constants/screens";
import { Appbar } from "react-native-paper";
import AllProductsAppBar from "./appBar";
import { SearchParams } from "../../entities/SearchParams";


export default function ProductsScreen() {
    const productsViewRef = useRef<ProductsViewRef>(null)    
    const performSearch = (searchParams:SearchParams) => {        
        productsViewRef.current?.refreshList(searchParams);
    }
    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.container}>
            <AllProductsAppBar performSearch={performSearch} />
            <View style={styles.brandSelector}>
                <BrandSelector />
            </View>
            <View style={styles.productsView}>
                <ProductsView ref={productsViewRef} />
            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    brandSelector: {
        margin: 10
    },
    productsView: {
        paddingHorizontal: 10,
        height: SCREEN_HEIGHT * 0.75
    },
});