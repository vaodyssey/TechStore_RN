import { StyleSheet, View } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/screens";
import { DARK_BLUE, DARK_RED, LIGHT_BLUE, PALE_WHITE } from "../../constants/colors";
import { Button, Text } from "react-native-paper";
import { FormatPriceToVnd } from "../../utils/PriceUtils";
import { ProductWithQuantity } from "../../entities/ProductWithQuantity";
import { showInfoAlert, showYesNoAlert } from '../../utils/AlertUtils';
import { API_Orders_Create } from "../../services/apis/order";

type CheckoutProps = {
    totalPrice: number
    productsWithQuantities: ProductWithQuantity[]
}
export default function Checkout({ totalPrice, productsWithQuantities }: CheckoutProps) {
    const handleCheckout = () => {
        showYesNoAlert('Do you want to proceed with the checkout?', performCheckout)
    }
    const performCheckout = () => {
        API_Orders_Create(productsWithQuantities).then(() => {
            showInfoAlert('Successfully created an order for you.')
        }).catch((error) => {
            showInfoAlert(`Something went wrong. Here is the error: ${error.message}`)
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.priceContainer}>
                <Text variant="titleLarge" style={styles.price}>
                    Total: {FormatPriceToVnd(totalPrice)}
                </Text>
            </View>
            <View style={styles.blankView} />
            <View>
                <Button
                    style={styles.addToCartBtn}
                    icon="cart" mode="contained"
                    buttonColor={DARK_BLUE}
                    rippleColor={PALE_WHITE}
                    onPress={handleCheckout}>
                    Checkout
                </Button>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: LIGHT_BLUE,
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingVertical: 15,
        flexDirection: 'row'
    },
    price: {
        fontWeight: 'bold',
        color: DARK_RED
    },
    priceContainer: {
        justifyContent: "center",
        alignItems:"flex-start"
    },
    blankView: {
        width: 20
    }, addToCartBtn: {
        height: 50,
        justifyContent: 'center',
        width: 160,
    }
});