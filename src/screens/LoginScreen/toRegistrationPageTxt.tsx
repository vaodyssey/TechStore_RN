import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function ToRegistrationPageTxt() {
    const navigation: NavigationProp<ParamListBase> = useNavigation()
    const goToRegistrationPage = () => {
        navigation.navigate('register')
    }
    return (
        <View style={styles.container}>
            <Text variant='labelLarge'>Don't have an account yet?</Text>
            <Text style={styles.signUpTxt} onPress={goToRegistrationPage} >Sign up here!</Text>
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