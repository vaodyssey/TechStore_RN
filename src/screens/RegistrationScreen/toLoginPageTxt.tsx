import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function ToLoginPageTxt() {
    const navigation: NavigationProp<ParamListBase> = useNavigation()
    const goToLoginPage = () => {
        navigation.navigate('login')
    }
    return (
        <View style={styles.container}>
            <Text variant='labelLarge'>Already have an account?</Text>
            <Text style={styles.signUpTxt} onPress={goToLoginPage}>Login here!</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    signUpTxt: {
        marginHorizontal: 5
    }
})