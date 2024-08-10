import { ScrollView, StyleSheet, View } from "react-native";
import { DASHBOARD_ITEMS } from "../../constants/dashboardItemData";
import DashboardItem from "../../components/dashboardItem";
import { SCREEN_HEIGHT } from "../../constants/screens";

export default function Dashboard() {
    return (
        <View>
            <ScrollView>
                {DASHBOARD_ITEMS.map((dashboardItem) => {
                    return (
                        <View style={styles.dashboardItem}>
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
    }
})