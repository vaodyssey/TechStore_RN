
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { SCREEN_HEIGHT } from "../../constants/screens";

export default function UserSection() {
    const imgSource = "https://i.pinimg.com/564x/d4/ef/25/d4ef25443bf99a718adabc8b1473a6aa.jpg"
    return (
        <View style={styles.container}>
            <Avatar.Image size={SCREEN_HEIGHT * 0.1} source={{uri:imgSource}} />
            <View style={styles.userInfo}>
                <Text style={styles.userName} variant="headlineSmall">
                    Dummy User Name
                </Text>
                <Text variant="labelLarge">
                    dummyemail@gmail.com
                </Text>
            </View>
        </View>
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