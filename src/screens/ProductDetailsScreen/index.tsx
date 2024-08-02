
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-paper/lib/typescript/components/Avatar/Avatar";
import ImageViewer from "../../components/imageViewer";
import { containerStyles } from "../../components/styles";
import { NavigationProp, ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { API_Products_GetById } from "../../services/apis/products";
import { ProductById } from "../../entities/ProductById";
import { ActivityIndicator } from "react-native-paper";
import { SCREEN_HEIGHT } from "../../constants/screens";
import ProductDescription from "./description";
import AddToCartSection from "./addToCart";

export type ProductDetailsParams = {
    productId: string
}
export default function ProductDetailsScreen() {
    const route: RouteProp<ParamListBase> = useRoute()
    const { productId } = route.params as ProductDetailsParams;
    const [productById, setProductById] = useState<ProductById>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Current productId: ', JSON.stringify(productId))
        API_Products_GetById(productId).then((productById) => {
            setProductById(productById)
            setLoading(false)
        }
        )
    }, [])
    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingAnim}>
                    <ActivityIndicator size="large" />
                </View >
            ) : (
                <View>
                    <ImageViewer
                        height={300}
                        url={productById?.image as string} />
                    <View style={styles.description}>
                        <ProductDescription
                            productById={productById as ProductById} />
                    </View>
                    <View style={styles.addToCartSectionContainer}>
                        <AddToCartSection />
                    </View>
                </View>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: SCREEN_HEIGHT
    },
    loadingAnim: {
        marginVertical: SCREEN_HEIGHT * 0.34
    },
    description: {
        margin: 15
    },
    addToCartSectionContainer: {
        position: "absolute",
        top:SCREEN_HEIGHT-140

    }
});