

import { LoginResult } from '../../entities/LoginResult';
import {  GET_USER_DETAILS } from '../../constants/url';
import { User } from '../../entities/User';
import { GetLoginResultFromSecureStore } from '../../utils/UserUtils';
export async function API_User_GetUserDetails(): Promise<User> {
    try {        
        const loginResult:LoginResult = await GetLoginResultFromSecureStore()        
        const response = await fetch(GET_USER_DETAILS + `/${loginResult.userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: loginResult.token
            }
        })
        const json = await response.json()
        const products = json['data'] as User
        return products
    } catch (error) {
        throw error
    }
}
