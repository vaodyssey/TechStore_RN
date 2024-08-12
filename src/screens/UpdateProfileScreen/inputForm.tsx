import { Controller, useForm } from "react-hook-form";
import { Alert, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { RED } from "../../constants/colors";
import { VALID_EMAIL } from "../../constants/regex";
import { SCREEN_HEIGHT } from "../../constants/screens";
import { API_User_UpdateDetails } from "../../services/apis/user";
import { UpdateUserRequest } from "../../entities/UpdateUserRequest";
import { showInfoAlert } from '../../utils/alertUtils';

export default function InputForm() {
    const { control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            email: "",
            phone: "",
            password: "",
            address: ""
        },
    })
    const onSubmit = (data: UpdateUserRequest) => {
        API_User_UpdateDetails(data).then((response) => {
            if (response.resultCode == '00')
                showInfoAlert("Successfully updated user details. Please log in again to continue.")
            else
                showInfoAlert(`Something went wrong. Here's the error: ${response.resultMessage}`)
        })

    }
    return (
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={100} >
            <Controller
                control={control}
                rules={{
                    required: true,
                    pattern: VALID_EMAIL
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Email"
                        mode="outlined"
                        style={styles.input}
                        numberOfLines={1}
                        onChangeText={onChange}
                    />)}
                name="email"
            />
            {errors.email && <Text style={styles.error}>Invalid email.</Text>}
            <Controller
                control={control}
                rules={{
                    required: true,

                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Phone"
                        mode="outlined"
                        style={styles.input}
                        numberOfLines={1}
                        onChangeText={onChange}
                    />)}
                name="phone"
            />
            {errors.email && <Text style={styles.error}>Invalid email.</Text>}
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Password"
                        mode="outlined"
                        style={styles.input}
                        numberOfLines={1}
                        secureTextEntry
                        onChangeText={onChange} />
                )}
                name="password"
            />
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Address"
                        mode="outlined"
                        style={styles.input}
                        numberOfLines={1}

                        onChangeText={onChange} />
                )}
                name="address"
            />
            {errors.password && <Text style={styles.error}>This is required.</Text>}

            <Button mode='contained' onPress={handleSubmit(onSubmit)}>Update</Button>

        </KeyboardAvoidingView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    textInput: {
        height: 60
    },
    input: {
        padding: 3,
        marginVertical: 5,
    },
    error: {
        color: RED,
        fontSize: 16,
        marginBottom: 10
    },
})