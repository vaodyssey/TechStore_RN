import { GET_ALL_PRODUCTS_ENDPOINT } from "../../constants/url"
import { Product } from "../../entities/Product"
import { ProductById } from "../../entities/ProductById"
import { SearchParams } from "../../entities/SearchParams"



export async function API_Products_GetAll(params: SearchParams): Promise<Product[]> {
    try {
        const PARAM_LIST = BuildGetAllParams(params)
        const response = await fetch(GET_ALL_PRODUCTS_ENDPOINT + PARAM_LIST, {
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

function BuildGetAllParams(params: SearchParams): string {
    let result = ''
    if (params.keyword != '') result += `?searchTerm=${params.keyword}`
    return result
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