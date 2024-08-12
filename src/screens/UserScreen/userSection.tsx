
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { SCREEN_HEIGHT } from "../../constants/screens";
import { useEffect, useState } from "react";
import { LoginResult } from "../../entities/LoginResult";
import { User } from "../../entities/User";
import { API_User_GetUserDetails } from "../../services/apis/user";

export type UserSectionProps = {
    loginResult: LoginResult
}
export default function UserSection({ loginResult }: UserSectionProps) {
    const imgSource = "https://i.pinimg.com/564x/d4/ef/25/d4ef25443bf99a718adabc8b1473a6aa.jpg"
    const [user, setUser] = useState<User>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        API_User_GetUserDetails().then((user) => {
            setUser(user)
            setIsLoading(false)
        })
    }, [])
    return (
        <View >
            {isLoading ? (<View></View>) :
                (
                    <View style={styles.container}>
                        <Avatar.Image size={SCREEN_HEIGHT * 0.1} source={{ uri: imgSource }} />
                        <View style={styles.userInfo}>
                            <Text style={styles.userName} variant="headlineSmall">
                                {user?.username}
                            </Text>
                            <Text variant="labelLarge">
                                {user?.email}
                            </Text>
                        </View>
                    </View>
                )}


        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    userInfo: {
        margin: 10
    },
    userName: {
        fontWeight: "bold"
    }
})