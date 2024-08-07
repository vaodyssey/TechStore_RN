import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { Product } from "../../entities/Product"
import { API_Products_GetAll } from "../../services/apis/products"
import { ScrollView, View, StyleSheet, FlatList, ListRenderItemInfo, ListRenderItem, Dimensions } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import ProductCard from "../../components/productCard"
import { SearchParams } from "../../entities/SearchParams"

type ProductsViewProps = {

}
export interface ProductsViewRef {
    refreshList: (searchParams: SearchParams) => void;
}
const ProductsView = forwardRef<ProductsViewRef, ProductsViewProps>((props, ref) => {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<Product[]>()
    const defaultSearchParams: SearchParams = {
        keyword: ''
    }
    useEffect(() => {
        refreshList(defaultSearchParams)
    }, [])
    useImperativeHandle(ref, () => ({
        refreshList: (searchParams: SearchParams) => {
            refreshList(searchParams)
        }
    }));
    const refreshList = (searchParams: SearchParams) => {
        setLoading(true)
        API_Products_GetAll(searchParams).then((productsResponse) => {            
            setProducts(productsResponse)
            setLoading(false)
        })
    }
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
})

export default ProductsView

const { height: screenHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
    loadingAnim: {
        marginVertical: screenHeight * 0.32
    },
});