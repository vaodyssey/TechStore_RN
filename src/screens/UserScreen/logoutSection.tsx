import { Alert, StyleSheet, View } from "react-native";
import { DARK_RED } from "../../constants/colors";
import { Button } from "react-native-paper";
import * as SecureStore from 'expo-secure-store'
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { showYesNoAlert } from "../../utils/alertUtils";
export default function LogoutSection() {
    const navigation: NavigationProp<ParamListBase> = useNavigation()
    const logout = () => {
        SecureStore.deleteItemAsync('loginResult').then(() => {
            navigation.navigate('home', { screen: 'allProducts' })
        })
    }
    const showConfirmLogoutModal = () => {
        showYesNoAlert("Do you really want to log out?", logout)
    }
    return (
        <View>
            <Button mode="contained" style={styles.logoutBtn}
                onPress={showConfirmLogoutModal}>
                Log me out!
            </Button>
        </View>)
}

const styles = StyleSheet.create({
    logoutBtn: {
        margin: 30,
        backgroundColor: DARK_RED
    }
})