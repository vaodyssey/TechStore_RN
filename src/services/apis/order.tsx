import { CREATE_ORDER, GET_ALL_BRANDS_ENDPOINT } from "../../constants/url"
import { ProductWithQuantity } from "../../entities/ProductWithQuantity"
import { CRUDResponse } from "../../entities/CRUDResponse"
import { GetLoginResultFromSecureStore } from "../../utils/UserUtils"

export async function API_Orders_Create(productsWithQuantities: ProductWithQuantity[]): Promise<CRUDResponse> {
    try {
        const itemsForCreateOrder = BuildItemsForCreateOrder(productsWithQuantities)
        const loginResult = await GetLoginResultFromSecureStore()
        const reqBody = JSON.stringify({
            data: {
                products: itemsForCreateOrder,
                amount: 1,
                user_id: loginResult.userId
            }
        })
        const response = await fetch(CREATE_ORDER, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: loginResult.token
            },
            body: reqBody
        })
        const json = await response.json()
        const updateResult = json as CRUDResponse
        return updateResult
    } catch (error) {
        throw error
    }
}

type CreateOrderItem = {
    id: string,
    quantity: number
}
function BuildItemsForCreateOrder(productsWithQuantities: ProductWithQuantity[]): CreateOrderItem[] {
    let result = [] as CreateOrderItem[]
    productsWithQuantities.map((productWithQuantity) => {
        result.push({ id: productWithQuantity.productid, quantity: productWithQuantity.quantity })
    })
    return result
}

