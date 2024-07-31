import { LOGIN_ENDPOINT } from '../../constants/url';
import { LoginDetails } from '../../entities/LoginDetails';
export async function API_Login(loginDetails: LoginDetails) {
    try {
        const reqBody = JSON.stringify({
            data: {
                username: loginDetails?.email,
                password: loginDetails?.password,
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



