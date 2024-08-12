// app/db/db.ts

import * as SQLite from 'expo-sqlite'
import { ItemInCart } from '../entities/CartItem';


export const SQLite_OpenConnection = async (): Promise<SQLite.SQLiteDatabase> => {
    return await SQLite.openDatabaseAsync("techStore.db", {
        useNewConnection: true
    });
}

export const SQLite_DropTables = async (db: SQLite.SQLiteDatabase) => {
    const cartQuery = `
        DROP TABLE cart
  `
    try {
        await db.execAsync(cartQuery)
    } catch (error) {
        console.error(error)
        throw Error(`Failed to create tables`)
    }
}

export const SQLite_CreateTables = async (db: SQLite.SQLiteDatabase) => {
    const cartQuery = `
    CREATE TABLE IF NOT EXISTS Cart (
        id TEXT,
        quantity INTEGER,        
        PRIMARY KEY(id)
    )
  `
    try {
        await db.execAsync(cartQuery)
    } catch (error) {
        console.error(error)
        throw Error(`Failed to create tables`)
    }
}


export const SQLite_AddItemToCart = async (db: SQLite.SQLiteDatabase, cartItem: ItemInCart) => {
    const insertQuery = `
   INSERT INTO Cart (id,quantity)
   VALUES (?, ?)
 `
    const values = [
        cartItem.id,
        cartItem.quantity
    ]
    try {
        return db.runAsync(insertQuery, values)
    } catch (error) {
        console.error(error)
        throw Error("Failed to add item to cart.")
    }
}

export const SQLite_GetAllProductsFromCart = async (db: SQLite.SQLiteDatabase): Promise<ItemInCart[]> => {
    const allRows = await db.getAllAsync('SELECT * FROM cart') as ItemInCart[];
    return allRows
}