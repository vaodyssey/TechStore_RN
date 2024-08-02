import { StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { FormatPriceToVnd } from "../utils/PriceUtils";
import { Product } from "../entities/Product";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { ProductDetailsParams } from "../screens/ProductDetailsScreen";
import { LIGHT_BLUE, PALE_WHITE } from "../constants/colors";


type ProductCardProps = {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const navigation: NavigationProp<ParamListBase> = useNavigation()
    const toProductDetailsPage = () => {
        const params: ProductDetailsParams = { productId: product.id }
        navigation.navigate("productDetails", params);
    }
    return (
        <Card style={styles.productCard} onPress={toProductDetailsPage}>
            <Card.Cover source={{ uri: product.image }} />
            <Card.Title title={product.name} subtitle={FormatPriceToVnd(product.price)}
                titleVariant="bodyLarge"
                subtitleVariant="titleMedium" titleNumberOfLines={2}
                subtitleStyle={styles.price} />
        </Card>
    )
}
const styles = StyleSheet.create({
    productCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 10,
        margin: 10,
        backgroundColor: PALE_WHITE
    },
    price: {
        fontWeight: "bold"
    }
});