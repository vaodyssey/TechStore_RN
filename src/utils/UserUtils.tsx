import { LoginResult } from "../entities/LoginResult";
import * as SecureStore from 'expo-secure-store'

export async function GetLoginResultFromSecureStore(): Promise<LoginResult> {
    const loginResultStr = await SecureStore.getItemAsync('loginResult')
    const loginResult: LoginResult = JSON.parse(loginResultStr as string);
    return loginResult
}

export async function SetLoginResultToSecureStore(response:any):Promise<void> {
    const loginResult: LoginResult = response.data
    const loginResultJson = JSON.stringify(loginResult)
    await SecureStore.setItemAsync('loginResult', loginResultJson)
}