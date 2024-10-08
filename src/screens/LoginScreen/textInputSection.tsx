import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";
import { LoginRequest } from "../../entities/LoginRequest";
import { Controller, useForm } from "react-hook-form";
import { RED } from "../../constants/colors";
type TextInputSectionProps = {
    handleLogin: (loginDetails: LoginRequest) => void;
}
export default function TextInputSection({ handleLogin }: TextInputSectionProps) {
    const { control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
    })
    const onSubmit = (data: LoginRequest) => {
        handleLogin(data);

    }
    return (
        <View>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        mode='outlined'
                        label="Username"
                        style={styles.input}
                        numberOfLines={1}
                        onChangeText={onChange}
                    />)}
                name="email"
            />
            {errors.email && <Text style={styles.error}>This is required.</Text>}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        mode='outlined'
                        label="Password"
                        style={styles.input}
                        numberOfLines={1}
                        secureTextEntry
                        onChangeText={onChange} />
                )}
                name="password"
            />

            {errors.password && <Text style={styles.error}>This is required.</Text>}
            <View>
                <Button mode='contained' onPress={handleSubmit(onSubmit)}>Login</Button>
            </View>
        </View>)
}


const styles = StyleSheet.create({
    input: {
        padding: 3,        
        fontSize: 16,
        marginBottom: 30
    },
    error: {
        color: RED,
        fontSize: 16,
        marginBottom: 10
    }
});