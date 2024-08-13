import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { RED } from "../../constants/colors";
import { VALID_EMAIL } from "../../constants/regex";
import { RegistrationRequest } from "../../entities/RegistrationRequest";

type TextInputSectionProps = {
    handleRegistration: (registrationRequest: RegistrationRequest) => void;
}
export default function TextInputSection({ handleRegistration }: TextInputSectionProps) {
    const { control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            username: "",
            password: "",
            email: ""
        },
    })
    const onSubmit = (data: RegistrationRequest) => {
        handleRegistration(data);

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
                name="username"
            />
            {errors.email && <Text style={styles.error}>This is required.</Text>}
            <Controller
                control={control}
                rules={{
                    required: true,
                    pattern: VALID_EMAIL
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        mode='outlined'
                        label="Email"
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
                <Button mode='contained' onPress={handleSubmit(onSubmit)}>Register</Button>
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