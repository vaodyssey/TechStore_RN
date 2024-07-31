import { useEffect, useState } from "react"
import { Product } from "../../entities/Product"
import { API_Products_GetAll } from "../../services/apis/products"
import { ScrollView, View, StyleSheet, FlatList, ListRenderItemInfo, ListRenderItem, Dimensions } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import ProductCard from "../../components/productCard"

// type ProductsViewProps = {
//     navigation
// }
export default function ProductsView() {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<Product[]>()
    useEffect(() => {
        API_Products_GetAll().then((productsResponse) => {
            setProducts(productsResponse)
            setLoading(false)
        })

    }, [])
    return (
        <View>
            {loading ? (
                <View style={styles.loadingAnim}>
                    <ActivityIndicator size="large" />
                </View >
            ) : (

                <FlatList
                    data={products}
                    renderItem={(flatListItem) =>
                        <ProductCard product={flatListItem.item}
                        />}
                    keyExtractor={(product) => product.id}
                    numColumns={2}
                />
            )}
        </View>
    )
}

const { height: screenHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
    loadingAnim: {
        marginVertical: screenHeight * 0.32
    },
});