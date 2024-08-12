import { Alert } from "react-native";

export function showInfoAlert(prompt: string) {
    Alert.alert('Information', prompt, [
        { text: 'Okay', onPress: () => null }
    ])
}
export function showYesNoAlert(prompt: string, action: () => void) {
    Alert.alert('Warning', prompt, [
        { text: 'Yes', onPress: () => action() },
        { text: 'No', onPress: () => null }
    ])
}