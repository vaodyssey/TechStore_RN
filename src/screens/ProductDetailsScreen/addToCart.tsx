import { StyleSheet, View } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/screens";
import { Button, IconButton, Text } from "react-native-paper";
import { DARK_BLUE, LIGHT_BLUE, PALE_PURPLE, PALE_WHITE, RED } from '../../constants/colors';
import InputSpinner from "react-native-input-spinner";
import { useState } from "react";
import { blue100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
export default function AddToCartSection() {
    const [quantity, setQuantity] = useState(1)
    return (
        <View style={styles.container}>
            <View style={styles.inputSpinner}>
                <InputSpinner
                    max={10}
                    min={1}
                    step={1}
                    colorMax={RED}
                    colorMin={DARK_BLUE}
                    value={quantity}
                    width={150}
                    fontSize={20}
                    onChange={(num) => setQuantity(num as number)}
                />
            </View>
            <View style={styles.blankView} />
            <View style={styles.addToCartSection}>
                <Button
                    style={styles.addToCartBtn}
                    icon="cart" mode="contained"
                    buttonColor={DARK_BLUE}
                    rippleColor={PALE_WHITE}>
                    Add To Cart
                </Button>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.11,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: LIGHT_BLUE,
        justifyContent: 'center',
        padding: 15,
        flexDirection: 'row'
    },
    inputSpinner: {
        margin: 0
    },
    blankView: {
        width: 40
    },
    addToCartSection: {


    }, addToCartBtn: {
        height: 50,
        justifyContent: 'center',
        width: 180
    }
});