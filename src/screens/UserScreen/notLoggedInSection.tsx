import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SCREEN_HEIGHT } from "../../constants/screens";
import { LIGHT_BLUE, DARK_BLUE } from '../../constants/colors';
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

export default function NotLoggedInSection() {
    const navigation: NavigationProp<ParamListBase> = useNavigation()
    const goToLoginPage = () => {

        navigation.navigate("login")
    }
    return (
        <View style={styles.container}>
            <Text numberOfLines={2} variant='headlineLarge'>
                First time here? </Text>
            <Text numberOfLines={2} style={styles.loginTxt}>
                Please sign in to continue. </Text>
            <Button mode="contained" style={styles.loginBtn} labelStyle={styles.loginBtnLabel}
                onPress={goToLoginPage}>
                Login
            </Button>
        </View>
    )
}
const styles = StyleSheet.create(
    {
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            height: SCREEN_HEIGHT * 0.8
        },
        loginTxt: {
            fontWeight: 'bold',
            marginVertical: 5,
            fontSize: 22,
            textAlign: 'center'
        },
        loginBtn: {
            backgroundColor: DARK_BLUE,
            height: 60,
            justifyContent: 'center',
            marginVertical: 25,
        },
        loginBtnLabel: {
            fontSize: 20
        }
    }
)