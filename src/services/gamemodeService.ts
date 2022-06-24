import sql, { ConnectionPool } from "mssql";
import Gamemode from "../models/gamemode"

export const getGamemodeBy = async (db: ConnectionPool, value: number | string, parameter: string): Promise<Gamemode> => {
    const response = await db.request().query(`SELECT * FROM [Gamemode] WHERE ${parameter} = ${value}`);
    return response.recordset as Gamemode;
};//sobra

export const createGamemode = async (db: ConnectionPool): Promise<number> => {
    const response = await db.request().query(`createGamemode`);//parameters
    return response.rowsAffected[0];
};