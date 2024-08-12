import { StyleSheet, View, ViewBase } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import UserSection from "../../components/userSection";
import Dashboard from "./dashboard";
import { DARK_GRAY, DARK_RED, LIGHT_BLUE, LIGHT_GRAY } from "../../constants/colors";
import { useCallback, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store'
import NotLoggedInSection from "./notLoggedInSection";
import { NavigationProp, ParamListBase, useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import LogoutSection from "./logoutSection";
import { GetLoginResultFromSecureStore } from "../../utils/UserUtils";
import { LoginResult } from "../../entities/LoginResult";
export default function UserScreen() {
    const [loading, setLoading] = useState<boolean>(true)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [loginResult, setLoginResult] = useState<LoginResult>()
    useFocusEffect(useCallback(() => {
        GetLoginResultFromSecureStore().then((result) => {
            if (result === null) {
                console.log('Result is null!')
                setIsLoggedIn(false)
            } else {
                setIsLoggedIn(true)
                setLoginResult(result)
            }
            console.log('Current token: ', result.token)

        }).catch((error) => {

        })
            .finally(() => setLoading(false))

    }, []))
    return (
        <View style={styles.container}>
            {loading ? (<View>
                <ActivityIndicator size="large" />
            </View>) : (null)}
            {isLoggedIn ? (
                <View style={styles.container}>
                    <View style={styles.contentContainer}>
                        <View style={styles.userSection}>
                            <UserSection loginResult={loginResult as LoginResult} />
                        </View>
                        <View style={styles.dashboard}>
                            <Dashboard />
                        </View>
                    </View>
                    <LogoutSection />
                </View>

            ) : (<View>
                <NotLoggedInSection />
            </View>)}
        </View >
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
    },
    userSection: {
        marginVertical: 40,
        marginHorizontal: 20
    },

    dashboard: {
        marginVertical: 2,
        marginHorizontal: 20
    }

})