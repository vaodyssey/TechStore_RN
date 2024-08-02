import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { API_Products_GetById } from "../../services/apis/products";
import { SCREEN_HEIGHT } from "../../constants/screens";
import { ProductById } from "../../entities/ProductById";
import CartItem from "../../components/cartItem";
import Checkout from "./checkout";

export default function CartScreen() {
    const [loading, setLoading] = useState(true)
    const [productByIdList, setProductByIdList] = useState<ProductById[]>()

    const LoadAllProductsByListOfIds = () => {
        try {
            const productIdList = ["6825cac4-d8e6-4208-a902-d4533c2023e6",
                "f737a92c-d0ea-4c6a-8365-c4714323262f",
                "6825cac4-d8e6-4208-a902-d4533c2023e6",
                "f737a92c-d0ea-4c6a-8365-c4714323262f"]
            const promises = [] as Promise<ProductById>[]
            productIdList.map((productId) => {
                const promise = API_Products_GetById(productId);
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
        LoadAllProductsByListOfIds()
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