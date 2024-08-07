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
    const [cartItems, setCartItems] = useState<ItemInCart[]>();
    const GetProducts = async () => {
        await GetCartItems()
        await FetchProductsByCartItems()
    }
    const GetCartItems = async () => {
        SQLite_OpenConnection().then((db) => {
            SQLite_GetAllProductsFromCart(db)
                .then((result) => {
                    setCartItems(result)
                })
        });
    }
    const FetchProductsByCartItems = async () => {
        try {
            const promises = [] as Promise<ProductById>[]
            cartItems?.map((cartItem) => {
                const promise = API_Products_GetById(cartItem.id);
                promises.push(promise)
            })
            Promise.all(promises).then((result) => {
                setProductByIdList(result)
                setLoading(false)
            }
            )
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