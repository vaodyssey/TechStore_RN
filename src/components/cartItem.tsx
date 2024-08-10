import { StyleSheet, TouchableHighlight, View } from "react-native";
import ImageViewer from "./imageViewer";
import { useEffect, useState } from "react";
import { API_Products_GetById } from "../services/apis/products";
import { ProductById } from "../entities/ProductById";
import { ActivityIndicator, Button, Card, IconButton, Text } from "react-native-paper";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/screens";
import { DARK_BLUE, DARK_RED, LIGHT_BLUE, PALE_WHITE, RED, WHITE } from "../constants/colors";
import { FormatPriceToVnd } from "../utils/PriceUtils";
import InputSpinner from "react-native-input-spinner";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { ProductDetailsParams } from "../screens/ProductDetailsScreen";

type CartItemProps = {
    productById: ProductById
}
export default function CartItem({ productById }: CartItemProps) {
    const [quantity, setQuantity] = useState(1);
    const navigation: NavigationProp<ParamListBase> = useNavigation()
    const toProductDetailsPage = () => {
        const params: ProductDetailsParams = { productId: productById.id }
        navigation.navigate("productDetails", params);
    }

    return (
        <View style={styles.container}>
            <View onTouchEnd={toProductDetailsPage}>
                <ImageViewer height={220} width={180} url={productById.image} />
            </View>
            <View style={styles.detailsContainer}>
                <Text variant="titleMedium" style={styles.title}
                    numberOfLines={2}
                >{productById.name}</Text>
                <Text variant="titleMedium">{FormatPriceToVnd(productById.price)}</Text>
                <InputSpinner
                    style={styles.inputSpinner}
                    max={10}
                    min={1}
                    step={1}
                    colorMax={RED}
                    colorMin={DARK_BLUE}
                    value={quantity}
                    width={150}
                    fontSize={20}
                    onChange={(num) => setQuantity(num as number)}
                />

                <Button mode='contained' buttonColor={DARK_RED}
                    icon='trash-can'>
                    Remove
                </Button>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: "row",
        backgroundColor: PALE_WHITE,
        borderRadius: 10,
        overflow: "hidden",
    },
    detailsContainer: {
        flexDirection: "column",
        width: SCREEN_WIDTH - 260,
        marginVertical: 20,
        marginHorizontal: 10
    },
    inputSpinner: {
        marginVertical: 20
    },
    title: {
        fontWeight: "bold"
    },
    loadingAnim: {
        marginVertical: SCREEN_HEIGHT * 0.34
    },
})