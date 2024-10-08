import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { LoginRequest } from "../../entities/LoginRequest";
import { API_Login } from "../../services/apis/auth";
import { showInfoAlert } from "../../utils/AlertUtils";
import { SetLoginResultToSecureStore } from "../../utils/UserUtils";
import TextInputSection from "./textInputSection";
import TextSection from "./textSection";
import ToRegistrationPageTxt from "./toRegistrationPageTxt";

export default function LoginScreen() {
    const [loading, setLoading] = useState(false);
    const navigation: NavigationProp<ParamListBase> = useNavigation()
    const handleLogin = async (loginDetails: LoginRequest) => {
        setLoading(true)
        API_Login(loginDetails).then((response) => {
            console.log('Current response: ', response)
            if (response.resultCode == '00') {
                SetLoginResultToSecureStore(response).then(() => {
                    navigation.navigate('home')
                })
            } else {
                showInfoAlert(response.resultMessage)
            }

        }).catch((error) => {
            showInfoAlert(error.message)
        }).finally(() => {
            setLoading(false)
        })

    }

    return (
        <View style={styles.container}>
            {loading ? (
                <View>
                    <ActivityIndicator size="large" />
                </View >) : (

                <View>
                    <TextSection />
                    <TextInputSection
                        handleLogin={handleLogin} />
                    <View style={styles.toRegistrationPageTxt}>
                        <ToRegistrationPageTxt />
                    </View>
                </View>

            )

            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 50,
    },
    toRegistrationPageTxt: {
        marginVertical: 15
    }
});

