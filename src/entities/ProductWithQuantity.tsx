import { ProductById } from "./ProductById"

export type ProductWithQuantity = {
    productid: string,
    productById: ProductById | undefined
    quantity: number
}