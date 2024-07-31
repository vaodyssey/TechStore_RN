import { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { BASE_URL, LOGIN_ENDPOINT } from "../../constants/url";
import TextSection from "./textSection";
import TextInputSection from "./textInputSection";
import { LoginDetails } from "../../entities/LoginDetails";
import { containerStyles } from "../../components/styles";
import { API_Login } from "../../services/apis/auth";
import { NavigationProp, ParamListBase } from "@react-navigation/native";


type LoginScreenProps = {
    navigation: NavigationProp<ParamListBase>
}
export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [loading, setLoading] = useState(false);

    const handleLogin = (loginDetails: LoginDetails) => {
        setLoading(true)
        API_Login(loginDetails).then((response) => {
            setLoading(false)
            console.log(response)
            navigation.navigate('Products')
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

