import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { LIGHT_BLUE, LIGHT_GRAY } from '../constants/colors';
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";


type DashboardItemProps = {
    iconColor:string,
    icon: string
    optionName: string,
targetScreenName:string
}
export default function DashboardItem({iconColor,icon,optionName,targetScreenName}:DashboardItemProps) {
    const navigation:NavigationProp<ParamListBase> = useNavigation()
    const goToScreen = () => {
        navigation.navigate(targetScreenName)
    }
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
        <View style={styles.container} onTouchEnd={goToScreen}>
            <Avatar.Icon icon={icon} style={styles.avatarBg} />
            <Text variant="titleLarge" style={styles.optionName}> 
                {optionName}
            </Text>
        </View>
    )
}
