import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import InputForm from "./inputForm"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/screens"
import UserSection from "../../components/userSection"
import { useEffect, useState } from "react"
import { LoginResult } from "../../entities/LoginResult"
import { GetLoginResultFromSecureStore } from "../../utils/UserUtils"


export const UpdateProfileScreen = () => {    
    const [loginResult, setLoginResult] = useState<LoginResult>()
    useEffect(() => {
        GetLoginResultFromSecureStore().then((result) => {
            if (result === null) {
                console.log('Result is null!')
                
            } else {
                
                setLoginResult(result)
            }
            console.log('Current token: ', result.token)

        }).catch((error) => {

        })            

    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.userSection}>            
                <UserSection loginResult={loginResult as LoginResult} />
            </View>
            <InputForm />            
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        margin:20
    },
    userSection: {
        marginVertical:20
    },   
})