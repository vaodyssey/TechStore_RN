import { GET_ALL_BRANDS_ENDPOINT } from "../../constants/url"
import { Brand } from "../../entities/Brand"

export async function API_Brands_GetAll() {
    try {
        const response = await fetch(GET_ALL_BRANDS_ENDPOINT, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json()
        const brands = json['data']['items'] as Brand[]
        return brands
    } catch (error) {
        throw error
    }
}