import { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { BASE_URL, LOGIN_ENDPOINT } from "../../constants/url";
import TextSection from "./textSection";
import TextInputSection from "./textInputSection";
import { LoginDetails } from "../../entities/LoginDetails";
import { containerStyles } from "../../components/styles";
import { API_Login } from "../../services/apis/auth";

export default function LoginScreen() {
    const [loading, setLoading] = useState(false);

    const handleLogin = (loginDetails: LoginDetails) => {
        setLoading(true)
        API_Login(loginDetails).then((response) => {
            setLoading(false)
            console.log(response)
        })
    }
    return (
        <View style={containerStyles.auth}>
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

