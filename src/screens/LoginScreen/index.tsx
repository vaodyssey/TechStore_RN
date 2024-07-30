import { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";
import { BASE_URL, LOGIN_ENDPOINT } from "../../constants/url";
import TextSection from "./textSection";
import TextInputSection from "./textInputSection";
import { LoginDetails } from "../../entities/LoginDetails";

export default function LoginScreen() {
    const [loading, setLoading] = useState(false);    
    const handleLogin = (loginDetails:LoginDetails) => {
        setLoading(true)
        const reqBody = JSON.stringify({
            data: {
                username: loginDetails?.email,
                password: loginDetails?.password,
            }

        })
        fetch(LOGIN_ENDPOINT, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: reqBody
        }).then((response) => {
            response.json()
                .then((json) => {
                    setLoading(false)
                    console.log(json)
                })
        }).catch(error => {
            console.error(error);
        });
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