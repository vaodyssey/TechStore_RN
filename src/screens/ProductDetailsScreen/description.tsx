import { ScrollView, StyleSheet, View } from "react-native"
import { ProductById } from "../../entities/ProductById"
import { Text } from "react-native-paper"
import { FormatPriceToVnd } from "../../utils/PriceUtils"
import { DARK_RED, RED } from "../../constants/colors"
import { SAMPLE_DESCRIPTION } from '../../constants/text';
import StarRating from "react-native-star-rating-widget"
import { useState } from "react"
import { SCREEN_HEIGHT } from "../../constants/screens"

type ProductDescriptionProps = {
    productById: ProductById
}
export default function ProductDescription({ productById }: ProductDescriptionProps) {
    return (
        <View>
            <HeaderSection productById={productById} />
            <RatingSection />
            <DescriptionSection />
        </View>
    )
}


function HeaderSection({ productById }: ProductDescriptionProps) {
    return (
        <View>
            <Text variant="headlineSmall"
                style={styles.price}
            >{FormatPriceToVnd(productById.price)}</Text>
            <Text variant="titleLarge" numberOfLines={2}>{productById.name}</Text>
        </View>
    )
}
function DescriptionSection() {
    return (
        <View style={styles.description}>
            <Text variant='titleMedium'>Description</Text>
            <ScrollView>
                <Text variant='bodyLarge'>{SAMPLE_DESCRIPTION}</Text>
            </ScrollView>
        </View>
    )
}
function RatingSection() {
    const [rating, setRating] = useState(5);
    return (
        <View style={styles.stars}>
            <StarRating
                rating={rating}
                onChange={setRating}
            />
        </View>
    )
}

const { height: screenHeight } = SCREEN_HEIGHT
const styles = StyleSheet.create({
    price: {
        fontWeight: 'bold',
        color: DARK_RED
    },
    description: {
        marginTop: 10,
        maxHeight: screenHeight * 0.26
    },
    stars: {
        marginVertical: 10,
        marginLeft: -10
    }
})