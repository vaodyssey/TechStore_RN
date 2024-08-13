import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { API_Products_GetById, API_Products_GetByProductWithQuantity } from "../../services/apis/products";
import { SCREEN_HEIGHT } from "../../constants/screens";
import { ProductById } from "../../entities/ProductById";
import Checkout from "./checkout";
import { SQLite_OpenConnection } from "../../repository/SqliteDDL";
import { ItemInCart } from "../../entities/ItemInCart";
import CartItem from "../../components/cartItem";
import { CartItemRepository_GetAll, CartItemRepository_GetAllByProductId } from "../../repository/cartItemRepository";
import { useFocusEffect } from "@react-navigation/native";
import { ProductWithQuantity } from '../../entities/ProductWithQuantity';

export default function CartScreen() {
    const [loading, setLoading] = useState(true)
    const [productWithQuantities, setProductWithQuantities] = useState<ProductWithQuantity[]>()
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const getProducts = async () => {
        const cartItems = await getItemsFromDb()
        const productsWithQuantities = extractProductsWithQuantities(cartItems)
        fetchProductsByProductsWithQuantities(productsWithQuantities).then((productsWithQuantities) => {
            setProductWithQuantities(productsWithQuantities)
            calculateTotalPrice(productsWithQuantities)
            setLoading(false)
        })
    }
    const getItemsFromDb = async (): Promise<ItemInCart[]> => {
        const db = await SQLite_OpenConnection()
        const itemsInCart = await CartItemRepository_GetAll(db)
        return itemsInCart
    };
    const extractProductsWithQuantities = (itemsInCart: ItemInCart[]): ProductWithQuantity[] => {
        const productIdSet = [...new Set(itemsInCart.map(item => item.productid))];
        const result = [] as ProductWithQuantity[]
        for (const productId of productIdSet) {
            const productIdCount = itemsInCart.filter((item) => item.productid == productId).length
            result.push({ productid: productId, quantity: productIdCount, productById: undefined })
        }
        return result
    }

    const fetchProductsByProductsWithQuantities = async (productWithQuantityList: ProductWithQuantity[]): Promise<ProductWithQuantity[]> => {
        try {
            const promises = [] as Promise<ProductWithQuantity>[]
            productWithQuantityList?.map((productWithQuantity) => {
                const promise = API_Products_GetByProductWithQuantity(productWithQuantity);
                promises.push(promise)
            })
            const result = await Promise.all(promises).then((result) => { return result })
            return result

        } catch (error) {
            throw error
        }
    }

    const calculateTotalPrice = (prodWithQuantities: ProductWithQuantity[]) => {
        let total = 0
        for (const productWithQuantity of prodWithQuantities) {
            const prodById = productWithQuantity.productById as ProductById
            const finalPrice = prodById.price * productWithQuantity.quantity
            total += finalPrice
        }
        console.log('total price: ' + total)
        setTotalPrice(total)
    }
    useFocusEffect(useCallback(() => {
        getProducts()
    }, []))
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
                        data={productWithQuantities}
                        renderItem={(flatListItem) =>
                            <CartItem productWithQuantity={flatListItem.item}
                                refreshCart={getProducts}
                            />}
                        keyExtractor={(productWithQuantity) => productWithQuantity.productid}
                        numColumns={1}
                    />
                    <View style={styles.checkoutContainer}>
                        <Checkout totalPrice={totalPrice} productsWithQuantities={productWithQuantities as ProductWithQuantity[]} />
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