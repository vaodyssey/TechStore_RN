import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { LIGHT_BLUE, LIGHT_GRAY } from '../constants/colors';


type DashboardItemProps = {
    iconColor:string,
    icon: string
    optionName: string
}
export default function DashboardItem({iconColor,icon,optionName}:DashboardItemProps) {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        optionName: {
            fontWeight: 'bold',
            marginHorizontal: 10
        },
        avatarBg: {
            backgroundColor:iconColor
        }
    })
    return (
        <View style={styles.container}>
            <Avatar.Icon icon={icon} style={styles.avatarBg} />
            <Text variant="titleLarge" style={styles.optionName}> 
                {optionName}
            </Text>
        </View>
    )
}
