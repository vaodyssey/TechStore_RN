import { Alert, StyleSheet, View } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/screens";
import { Button, IconButton, Text } from "react-native-paper";
import { DARK_BLUE, LIGHT_BLUE, PALE_PURPLE, PALE_WHITE, RED } from '../../constants/colors';
import InputSpinner from "react-native-input-spinner";
import { useState } from "react";
import { blue100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { SQLite_OpenConnection } from '../../repository/SqliteDDL';
import { ItemInCart } from "../../entities/ItemInCart";
import { showInfoAlert } from '../../utils/AlertUtils';
import { SQLiteDatabase } from "expo-sqlite";
import { CartRepository_DoesCartExist, CartRepository_GetSingleByUserId, CartRepository_Insert } from "../../repository/cartRepository";
import { GetLoginResultFromSecureStore } from "../../utils/UserUtils";
import { Cart } from "../../entities/Cart";
import { GetCurrentDateTimeString } from "../../utils/DateTimeUtils";
import { LoginResult } from "../../entities/LoginResult";
import { CartItemRepository_Insert } from "../../repository/cartItemRepository";

type AddToCartSectionProps = {
    productId: string
}
export default function AddToCartSection({ productId }: AddToCartSectionProps) {
    const [quantity, setQuantity] = useState(1)

    const addItemToCart = async () => {
        const db = await SQLite_OpenConnection()
        const loginResult = await GetLoginResultFromSecureStore()
        await prepareCart(db, loginResult)
        await addToCart(db, loginResult)
    }
    const prepareCart = async (db: SQLiteDatabase, loginResult: LoginResult) => {
        const isCartAvailable = await CartRepository_DoesCartExist(db)
        if (!isCartAvailable) {
            const cart: Cart = {
                id: loginResult.userId,
                datetime: GetCurrentDateTimeString()
            }
            await CartRepository_Insert(db, cart)
        }

    }
    const addToCart = async (db: SQLiteDatabase, loginResult: LoginResult) => {
        for (let index = 0; index < quantity; index++) {
            const itemInCart: ItemInCart = {
                id: 0,
                productid: productId,
                datetime: GetCurrentDateTimeString(),
                cartid: loginResult.userId
            }
            CartItemRepository_Insert(db, itemInCart).then(() => {
                showInfoAlert("Successfully added the product into the Cart.")
            })
        }
    }

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
                    rippleColor={PALE_WHITE}
                    onPress={addItemToCart}>
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