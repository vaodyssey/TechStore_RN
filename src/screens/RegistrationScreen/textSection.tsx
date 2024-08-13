import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function TextSection() {
    return (
        <View style={styles.container}>
            <Text variant="displaySmall">Are you new here?</Text>
            <Text variant="titleSmall" style={styles.signInPrompt}>
                Register now to become part of our family!
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    signInPrompt: {
        fontWeight: "bold"
    }
});