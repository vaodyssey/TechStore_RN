import { useSelector } from "react-redux"
import { GET_ALL_PRODUCTS_ENDPOINT } from "../../constants/url"
import { Product } from "../../entities/Product"
import { ProductById } from "../../entities/ProductById"
import { SearchParams } from "../../entities/SearchParams"
import store, { RootState } from "../../redux/store"



export async function API_Products_GetAll(): Promise<Product[]> {
    try {
        const state: RootState = store.getState()
        const PARAM_LIST = BuildGetAllParams(state.search)
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
    console.log('BuldGetAllPar - Keyword: ', params.keyword)
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