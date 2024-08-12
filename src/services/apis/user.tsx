

import { LoginResult } from '../../entities/LoginResult';
import {  GET_USER_DETAILS, UPDATE_USER_DETAILS } from '../../constants/url';
import { User } from '../../entities/User';
import { GetLoginResultFromSecureStore } from '../../utils/UserUtils';
import { UpdateUserRequest } from '../../entities/UpdateUserRequest';
import { UpdateUserResponse } from '../../entities/UpdateUserResponse';
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

export async function API_User_UpdateDetails(updateUserRequest:UpdateUserRequest): Promise<UpdateUserResponse> {
    try {
        const loginResult: LoginResult = await GetLoginResultFromSecureStore()
        const reqBody = JSON.stringify({
            data: updateUserRequest
        })
        const response = await fetch(UPDATE_USER_DETAILS + `/${loginResult.userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: loginResult.token
            },
            body:reqBody
        })
        const json = await response.json()
        const updateResult = json as UpdateUserResponse
        return updateResult
    } catch (error) {
        throw error
    }
}
