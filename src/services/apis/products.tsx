import { GET_ALL_PRODUCTS_ENDPOINT } from "../../constants/url"
import { Product } from "../../entities/Product"
import { ProductById } from "../../entities/ProductById"


export async function API_Products_GetAll(): Promise<Product[]> {
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


export async function API_Products_GetById(id: string): Promise<ProductById> {
    try {
        const url = `${GET_ALL_PRODUCTS_ENDPOINT}/${id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json()
        const productById = json['data'] as ProductById
        return productById
    } catch (error) {
        throw error
    }
}