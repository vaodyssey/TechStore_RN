import { GET_ALL_PRODUCTS_ENDPOINT } from "../../constants/url"
import { Product } from "../../entities/Product"


export async function API_Products_GetAll() {
    try {
        const response = await fetch(GET_ALL_PRODUCTS_ENDPOINT, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json()
        const products = json['data']['items'] as Product[]
        return products
    } catch (error) {
        throw error
    }
}