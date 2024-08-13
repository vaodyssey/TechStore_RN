import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { RegistrationRequest } from '../../entities/RegistrationRequest';
import { API_Register } from "../../services/apis/auth";
import { showInfoAlert, showInfoAlertWithAction } from "../../utils/AlertUtils";
import TextInputSection from "./textInputSection";
import TextSection from "./textSection";
import ToLoginPageTxt from "./toLoginPageTxt";

export default function RegistrationScreen() {
    const [loading, setLoading] = useState(false);
    const navigation: NavigationProp<ParamListBase> = useNavigation()
    const handleRegistration = async (registrationRequest: RegistrationRequest) => {
        setLoading(true)

        API_Register(registrationRequest).then((response) => {
            console.log('Current response: ', response)
            if (response.resultCode == '00') {
                showInfoAlertWithAction("Successfully registered you as a user!", navigateToLoginScreen)
            } else {
                showInfoAlert(response.resultMessage)
            }

        }).catch((error) => {
            showInfoAlert(error.message)
        }).finally(() => {
            setLoading(false)
        })

    }
    const navigateToLoginScreen = () => {
        navigation.navigate('login')
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
                        handleRegistration={handleRegistration} />
                    <View style={styles.toLoginPageTxt}>
                        <ToLoginPageTxt />
                    </View>
                </View>)

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
    toLoginPageTxt: {
        marginVertical: 15
    }
});
