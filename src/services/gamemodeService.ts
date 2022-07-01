import sql, { ConnectionPool } from "mssql";
import Gamemode from "../models/gamemode"

export const createGamemode = async (db: ConnectionPool, gamemode: Gamemode): Promise<number> => {
    const response = await db.request()
    .input("name", sql.VarChar(30), gamemode.name)
    .input("playersPerGame", sql.Int, gamemode.playersPerGame)
    .query(`createGamemode`);
    return response.rowsAffected[0];
};