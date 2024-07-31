import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";
import { LoginDetails } from "../../entities/LoginDetails";
import { Controller, useForm } from "react-hook-form";
import { RED } from "../../constants/colors";
import BrandSelector from "./brandsSelector";
import { containerStyles } from "../../components/styles";
import ProductsView from "./productsView";
export default function ProductsScreen() {
    return (
        <View style={containerStyles.products}>
            <BrandSelector />
            <ProductsView/>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        padding: 3,
        borderWidth: 1,
        fontSize: 16,
        marginBottom: 30
    },
    error: {
        color: RED,
        fontSize: 16,
        marginBottom: 10
    }
});