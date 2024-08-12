import { ScrollView, StyleSheet, View } from "react-native";
import { DASHBOARD_ITEMS } from "../../constants/dashboardItemData";
import DashboardItem from "../../components/dashboardItem";
import { SCREEN_HEIGHT } from "../../constants/screens";
import { Text } from "react-native-paper";
import { DARK_GRAY } from "../../constants/colors";

export default function Dashboard() {
    return (
        <View>
            <Text style={styles.dashboardTxt} variant="titleMedium">Dashboard</Text>
            <ScrollView>
                {DASHBOARD_ITEMS.map((dashboardItem,key) => {
                    return (
                        <View style={styles.dashboardItem} key={key}>
                            <DashboardItem
                                iconColor={dashboardItem.iconColor}
                                icon={dashboardItem.icon}
                                optionName={dashboardItem.optionName} />
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    dashboardItem: {
        marginVertical:SCREEN_HEIGHT*0.01
    },
    dashboardTxt: {
        marginVertical: 2,        
        color: DARK_GRAY
    }
})