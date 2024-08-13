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
import { showYesNoAlert } from "../utils/AlertUtils";
import { CartItemRepository_DeleteByProductId } from "../repository/cartItemRepository";
import { SQLite_OpenConnection } from "../repository/SqliteDDL";
import { ProductWithQuantity } from '../entities/ProductWithQuantity';

type CartItemProps = {
    productWithQuantity: ProductWithQuantity
    refreshCart: () => void;
}
export default function CartItem({ productWithQuantity, refreshCart }: CartItemProps) {
    const [quantity, setQuantity] = useState<number>(productWithQuantity.quantity);
    const productById = productWithQuantity.productById as ProductById
    const navigation: NavigationProp<ParamListBase> = useNavigation()
    const toProductDetailsPage = () => {
        const params: ProductDetailsParams = { productId: productWithQuantity.productid }
        navigation.navigate("productDetails", params);
    }
    const removeItemFromCart = () => {
        showYesNoAlert("Do you really want to remove this item from the Cart?",
            deleteByProductId)
    }
    const deleteByProductId = async () => {
        const db = await SQLite_OpenConnection();
        CartItemRepository_DeleteByProductId(db, productById.id).then(() => {
            refreshCart()
        })
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
                    icon='trash-can'
                    onPress={removeItemFromCart}>
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