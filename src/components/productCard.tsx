import { StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { FormatPriceToVnd } from "../utils/PriceUtils";

type ProductCardProps = {
    name: string,
    price: number,
    image: string
}
export default function ProductCard({ name, price, image }: ProductCardProps) {
    
    return (
        <Card style={styles.productCard} onPress={() => console.log('Product name: ', name)}>
            <Card.Cover source={{ uri: image }} />
            <Card.Title title={name} subtitle={FormatPriceToVnd(price)} titleVariant="bodyLarge"
                subtitleVariant="titleLarge" titleNumberOfLines={2}
                subtitleStyle={styles.price} />            
        </Card>
    )
}
const styles = StyleSheet.create({
    productCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding:10,
        margin:10
    },    
    price: {
        fontWeight:"bold"
    }
});