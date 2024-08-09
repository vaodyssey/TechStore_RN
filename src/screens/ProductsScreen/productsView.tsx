import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { Product } from "../../entities/Product"
import { API_Products_GetAll } from "../../services/apis/products"
import { ScrollView, View, StyleSheet, FlatList, ListRenderItemInfo, ListRenderItem, Dimensions } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import ProductCard from "../../components/productCard"
import { SearchParams } from "../../entities/SearchParams"
import { useDispatch } from "react-redux"
import { resetSearch } from "../../redux/searchSlice"

type ProductsViewProps = {

}
export interface ProductsViewRef {
    refreshList: () => void;
}
const ProductsView = forwardRef<ProductsViewRef, ProductsViewProps>((props, ref) => {
    const [products, setProducts] = useState<Product[]>()
    const [refreshing, setRefreshing] = useState(true);
    const dispatch = useDispatch()
    useEffect(() => {
        if (refreshing) refreshList()
    }, [refreshing])
    useImperativeHandle(ref, () => ({
        refreshList: refreshList
    }));
    const onPullRefresh = () => {
        dispatch(resetSearch())
        setRefreshing(true)
    }
    const refreshList = () => {
        API_Products_GetAll().then((productsResponse) => {
            setProducts(productsResponse)
            setRefreshing(false)
        })
    }
    return (
        <View>
            <FlatList
                data={products}
                renderItem={(flatListItem) =>
                    <ProductCard product={flatListItem.item}
                    />}
                refreshing={refreshing}
                onRefresh={onPullRefresh}
                keyExtractor={(product) => product.id}
                numColumns={2}
            />
        </View>
    )
})

export default ProductsView