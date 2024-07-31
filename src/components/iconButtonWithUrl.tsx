import { Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native"
import { LIGHT_BLUE } from '../constants/colors';

type IconButtonWithUrlProps = {
    url: string,
    onPress: () => void
}

export const IconButtonWithURL = ({ url, onPress }: IconButtonWithUrlProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Image source={{ uri: url }} style={styles.icon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 8,
        backgroundColor: LIGHT_BLUE,    
        marginHorizontal:10// Optional background color
    },
    icon: {
        width: 90,
        height: 40,
    },
});
