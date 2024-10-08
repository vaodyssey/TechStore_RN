import * as SQLite from 'expo-sqlite'
import { ItemInCart } from '../entities/ItemInCart'
import { GetLoginResultFromSecureStore } from '../utils/UserUtils'
import { showInfoAlert } from '../utils/AlertUtils'
export const CartItemRepository_Insert = async (db: SQLite.SQLiteDatabase, itemInCart: ItemInCart) => {
    const query = `
   INSERT INTO cartItems (productid,datetime,cartid)
   VALUES (?, ?, ?)
 `
    const values = [
        itemInCart.productid,
        itemInCart.datetime,
        itemInCart.cartid,
    ]
    try {
        return db.runAsync(query, values)
    } catch (error) {
        console.error(error)
        throw Error("Failed to add a CartItem to a Cart.")
    }
}


export const CartItemRepository_DeleteByProductId = async (db: SQLite.SQLiteDatabase, productId: string) => {
    const query = `
   DELETE FROM cartItems WHERE productid = ?
 `
    const values = [productId]
    try {
        return db.runAsync(query, values)
    } catch (error) {
        console.error(error)
        throw Error("Failed to remove a Product from the Cart.")
    }
}

export const CartItemRepository_GetAllByProductId = async (db: SQLite.SQLiteDatabase, productId: string): Promise<ItemInCart[]> => {
    const query = `SELECT * FROM cartItems where productid = ?`
    try {
        const result = await db.getAllAsync(query, productId) as ItemInCart[]
        return result
    } catch (error) {
        console.error(error)
        throw Error("Failed to get all CartItem in a Cart.")
    }
}

export const CartItemRepository_GetAll = async (db: SQLite.SQLiteDatabase): Promise<ItemInCart[]> => {
    const loginResult = await GetLoginResultFromSecureStore()
    const query = `SELECT * FROM cartItems WHERE cartid = ?`
    try {
        const result = await db.getAllAsync(query, loginResult.userId) as ItemInCart[]
        return result
    } catch (error) {
        showInfoAlert("It seems that you haven't logged in yet. Please try again to view contents in your cart.")
        throw Error("Failed to get all CartItem in a Cart.")
    }
}