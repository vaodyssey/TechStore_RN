// app/db/db.ts

import * as SQLite from 'expo-sqlite'
import { ItemInCart } from '../entities/ItemInCart';


export const SQLite_OpenConnection = async (): Promise<SQLite.SQLiteDatabase> => {
    return await SQLite.openDatabaseAsync("techStore.db", {
        useNewConnection: true
    });
}

export const SQLite_DropTables = async (db: SQLite.SQLiteDatabase) => {
    const cartQuery = `    
    DROP TABLE IF EXISTS carts;
    DROP TABLE IF EXISTS cartItems;`
    try {
        await db.execAsync(cartQuery)
    } catch (error) {
        console.error(error)
        throw Error(`Failed to create tables`)
    }
}

export const SQLite_CreateTables = async (db: SQLite.SQLiteDatabase) => {
    const cartQuery = `
    CREATE TABLE IF NOT EXISTS carts (
        id TEXT,
        datetime TEXT,        
        PRIMARY KEY(id)
    );
       CREATE TABLE IF NOT EXISTS cartItems (
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        productid TEXT,
        datetime TEXT,
        cartid TEXT,        
        FOREIGN KEY (cartid) REFERENCES carts(id)
    );
  `
    try {
        await db.execAsync(cartQuery)
    } catch (error) {
        console.error(error)
        throw Error(`Failed to create tables`)
    }
}



