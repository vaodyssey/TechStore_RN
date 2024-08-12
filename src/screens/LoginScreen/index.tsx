import { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Alert } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { BASE_URL, LOGIN_ENDPOINT } from "../../constants/url";
import TextSection from "./textSection";
import TextInputSection from "./textInputSection";
import { LoginDetails } from "../../entities/LoginDetails";
import { containerStyles } from "../../components/styles";
import { API_Login } from "../../services/apis/auth";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store'
import { LoginResult } from "../../entities/LoginResult";
import { SetLoginResultToSecureStore } from "../../utils/UserUtils";
type LoginScreenProps = {
    navigation: NavigationProp<ParamListBase>
}
export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [loading, setLoading] = useState(false);
    const alertLoginError = (msg: string) => {
        Alert.alert('Information', msg, [
            { text: 'Okay', onPress: () => null }
        ])
    }
    const handleLogin = async (loginDetails: LoginDetails) => {
        setLoading(true)
        API_Login(loginDetails).then((response) => {
            console.log('Current response: ',response)
            if (response.resultCode == '00') {
                SetLoginResultToSecureStore(response).then(() => {
                    navigation.navigate('home')
                })
            } else {
                alertLoginError(response.resultMessage)
            }

        }).catch((error) => {
            alertLoginError(error.message)
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

