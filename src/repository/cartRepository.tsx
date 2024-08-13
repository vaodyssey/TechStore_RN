import * as SQLite from 'expo-sqlite'

import { Cart } from '../entities/Cart'
import { GetLoginResultFromSecureStore } from '../utils/UserUtils'
export const CartRepository_Insert = async (db: SQLite.SQLiteDatabase, cart: Cart) => {
    const query = `
   INSERT INTO carts (id,datetime)
   VALUES (?, ?)
 `
    const values = [
        cart.id,
        cart.datetime
    ]
    try {
        return db.runAsync(query, values)
    } catch (error) {
        console.error(error)
        throw Error("Failed to create a new cart.")
    }
}

export const CartRepository_GetSingleByUserId = async (db: SQLite.SQLiteDatabase, userId: string): Promise<Cart> => {
    const query = `SELECT * FROM carts where id = ?`
    try {
        const result = await db.getFirstAsync(query, userId) as Cart
        return result
    } catch (error) {
        console.error(error)
        throw Error("Failed to get a Cart belonging to a User.")
    }
}


export const CartRepository_DoesCartExist = async (db: SQLite.SQLiteDatabase): Promise<boolean> => {
    const loginResult = await GetLoginResultFromSecureStore()
    const cart = await CartRepository_GetSingleByUserId(db, loginResult.userId)
    if (cart == null) return false
    return true
}