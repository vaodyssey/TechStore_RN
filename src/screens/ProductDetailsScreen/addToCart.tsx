import { StyleSheet, View } from "react-native";
import { SCREEN_HEIGHT } from "../../constants/screens";
import { Button } from "react-native-paper";
import { LIGHT_BLUE, PALE_PURPLE } from "../../constants/colors";

export default function AddToCartSection() {
    return (
        <View style={styles.container}>
            <Button>Hihihi</Button>
        </View>
    )
}

const { height: screenHeight } = SCREEN_HEIGHT
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        // height: screenHeight * 0.1,
        bottom:0,
        backgroundColor: PALE_PURPLE
    },
});