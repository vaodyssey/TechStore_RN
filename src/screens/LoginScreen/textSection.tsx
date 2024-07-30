import { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";
import { BASE_URL, LOGIN_ENDPOINT } from "../../constants/url";
export default function TextSection() {
    return (
        <View style={styles.container}>
            <Text variant="displayMedium">Welcome back!</Text>
            <Text variant="titleMedium" style={styles.signInPrompt}>
                Please sign in to continue.
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    signInPrompt: {
        fontWeight: "bold"
    }
});