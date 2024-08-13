import { LOGIN_ENDPOINT, REGISTRATION_ENDPOINT } from '../../constants/url';
import { CRUDResponse } from '../../entities/CRUDResponse';
import { LoginRequest } from '../../entities/LoginRequest';
import { RegistrationRequest } from '../../entities/RegistrationRequest';
export async function API_Login(LoginRequest: LoginRequest) {
    try {
        const reqBody = JSON.stringify({
            data: {
                username: LoginRequest?.email,
                password: LoginRequest?.password,
            }
        })
        const response = await fetch(LOGIN_ENDPOINT, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: reqBody
        })
        const json = await response.json()
        return json
    } catch (error) {
        throw error
    }
}

export async function API_Register(registrationRequest: RegistrationRequest):Promise<CRUDResponse> {
    try {
        const reqBody = JSON.stringify({
            data: {
                username: registrationRequest?.username,
                password: registrationRequest?.password,
                email: registrationRequest?.email,
            }
        })
        const response = await fetch(REGISTRATION_ENDPOINT, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: reqBody
        })
        const json = await response.json() as CRUDResponse        
        return json
    } catch (error) {
        throw error
    }
}



