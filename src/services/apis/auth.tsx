import { LOGIN_ENDPOINT } from '../../constants/url';
import { LoginRequest } from '../../entities/LoginRequest';
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



