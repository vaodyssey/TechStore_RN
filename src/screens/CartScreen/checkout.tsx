import { StyleSheet, View } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/screens";
import { DARK_BLUE, DARK_RED, LIGHT_BLUE, PALE_WHITE } from "../../constants/colors";
import { Button, Text } from "react-native-paper";

export default function Checkout() {
    return (
        <View style={styles.container}>
            <View style={styles.priceContainer}>
                <Text variant="titleLarge" style={styles.price}>Total: 69.000.000 đ</Text>
            </View>
            <View style={styles.blankView} />
            <View>
                <Button
                    style={styles.addToCartBtn}
                    icon="cart" mode="contained"
                    buttonColor={DARK_BLUE}
                    rippleColor={PALE_WHITE}>
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
        justifyContent: "center"
    },
    blankView: {
        width: 20
    }, addToCartBtn: {
        height: 50,
        justifyContent: 'center',
        width: 160,
    }
});