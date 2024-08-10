import { StyleSheet, View, ViewBase } from "react-native";
import { Button, Text } from "react-native-paper";
import UserSection from "./userSection";
import Dashboard from "./dashboard";
import { DARK_GRAY, DARK_RED, LIGHT_BLUE, LIGHT_GRAY } from "../../constants/colors";

export default function UserScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.userSection}>
                    <UserSection />
                </View>
                <Text style={styles.dashboardTxt} variant="titleMedium">Dashboard</Text>
                <View style={styles.dashboard}>
                    <Dashboard />
                </View>
            </View>

            <Button mode="contained" style={styles.logoutBtn} >
                Log me out!
            </Button>


        </View>
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
    dashboardTxt: {
        marginVertical: 2,
        marginHorizontal: 20,
        color: DARK_GRAY
    },
    dashboard: {
        marginVertical: 2,
        marginHorizontal: 20
    },
    logoutBtn: {
        margin: 30,
        backgroundColor:DARK_RED
    }
    
})