import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { API_Products_GetById } from "../../services/apis/products";
import { SCREEN_HEIGHT } from "../../constants/screens";
import { ProductById } from "../../entities/ProductById";
import Checkout from "./checkout";
import { SQLite_GetAllProductsFromCart, SQLite_OpenConnection } from "../../utils/DbUtils";
import { ItemInCart } from "../../entities/CartItem";
import CartItem from "../../components/cartItem";

export default function CartScreen() {
    const [loading, setLoading] = useState(true)
    const [productByIdList, setProductByIdList] = useState<ProductById[]>()

    const GetProducts = async () => {
        GetCartItems().then((cartItems) => {
            FetchProductsByCartItems(cartItems).then((productByIds) => {
                setProductByIdList(productByIds)
                setLoading(false)
            })
        })
    }
    const GetCartItems = async (): Promise<ItemInCart[]> => {
        const db = await SQLite_OpenConnection()
        const itemsInCart = await SQLite_GetAllProductsFromCart(db)
        return itemsInCart
    };

    const FetchProductsByCartItems = async (cartItems: ItemInCart[]): Promise<ProductById[]> => {
        try {
            const promises = [] as Promise<ProductById>[]
            cartItems?.map((cartItem) => {
                const promise = API_Products_GetById(cartItem.id);
                promises.push(promise)
            })
            const result = await Promise.all(promises).then((result) => { return result })
            return result

        } catch (error) {
            throw error
        }
    }
    useEffect(() => {
        GetProducts()
    }, [])
    return (
        <View>
            {loading ? (
                <View style={styles.loadingAnim}>
                    <ActivityIndicator size="large" />
                </View >
            ) : (
                <View>
                    <FlatList
                        style={styles.productList}
                        data={productByIdList}
                        renderItem={(flatListItem) =>
                            <CartItem productById={flatListItem.item}
                            />}
                        keyExtractor={(product) => product.id}
                        numColumns={1}
                    />
                    <View style={styles.checkoutContainer}>
                        <Checkout />
                    </View>
                </View>
            )}
        </View>)
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    loadingAnim: {
        marginVertical: SCREEN_HEIGHT * 0.34
    },
    productList: {
        margin: 10,
        height: SCREEN_HEIGHT - 200
    },
    checkoutContainer: {
        position: "absolute",
        top: SCREEN_HEIGHT - 180
    }
})