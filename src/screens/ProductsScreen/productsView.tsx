import { useEffect, useState } from "react"
import { Product } from "../../entities/Product"
import { API_Products_GetAll } from "../../services/apis/products"
import { ScrollView, View, StyleSheet, FlatList, ListRenderItemInfo, ListRenderItem } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import ProductCard from "../../components/productCard"

export default function ProductsView() {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<Product[]>()
    useEffect(() => {
        API_Products_GetAll().then((productsResponse) => {
            setProducts(productsResponse)
            setLoading(false)
        })

    }, [])
    // const renderItem:ListRenderItem<ProductCard> = (product:ListRenderItemInfo<Produc>) => {
    //     // <ProductCard image={productData.} name={productData.item.name}
    //     //     price={productData.item.price.toString()} />
    //     <Item
    // }
    return (
        <View>
            {loading ? (
                <View>
                    <ActivityIndicator size="large" />
                </View >
            ) : (

                <FlatList
                    data={products}
                    renderItem={(flatListItem) =>
                        <ProductCard image={flatListItem.item.image}
                            name={flatListItem.item.name}
                            price={flatListItem.item.price} />}
                    keyExtractor={(product) => product.id}
                    numColumns={2}
                />


            )}
        </View>
    )
}
const styles = StyleSheet.create({
    scroilView: {
        flexDirection: 'row',
        flex: 1,

    }
});


{
                        /* {products?.map((product, key) => {
                        return (
                            <ProductCard
                                image={product.image}
                                name={product.name}
                                price={"5000"}
                            />)
                    })} */}