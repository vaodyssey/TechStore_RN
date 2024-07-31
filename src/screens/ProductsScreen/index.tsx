import { useEffect, useState } from "react";
import { View, StyleSheet, Alert, BackHandler, AlertButton } from "react-native";
import BrandSelector from "./brandsSelector";
import { containerStyles } from "../../components/styles";
import ProductsView from "./productsView";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { SCREEN_HEIGHT } from "../../constants/screens";

export default function ProductsScreen() {    
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
            <View style={styles.brandSelector}>
                <BrandSelector />
            </View>
            <View style={styles.productsView}>
                <ProductsView />
            </View>            
        </View>

    )
}

const { height: screenHeight } = SCREEN_HEIGHT
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    brandSelector: {
        margin: 10
    },
    productsView: {
        paddingHorizontal: 10,
        height: screenHeight *0.8
    },    
});