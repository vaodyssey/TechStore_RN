import { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Alert } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { BASE_URL, LOGIN_ENDPOINT } from "../../constants/url";
import TextSection from "./textSection";
import TextInputSection from "./textInputSection";
import { LoginRequest } from "../../entities/LoginRequest";
import { containerStyles } from "../../components/styles";
import { API_Login } from "../../services/apis/auth";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store'
import { LoginResult } from "../../entities/LoginResult";
import { SetLoginResultToSecureStore } from "../../utils/UserUtils";
import { showInfoAlert } from "../../utils/AlertUtils";

type LoginScreenProps = {
    navigation: NavigationProp<ParamListBase>
}
export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [loading, setLoading] = useState(false);
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
});

