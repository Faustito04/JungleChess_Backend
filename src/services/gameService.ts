import sql, { ConnectionPool } from "mssql";
import Game from "../models/game"

export const getGameById = async (db: ConnectionPool, id: number): Promise<Game> => {
    const response = await db.request().query(`SELECT * FROM [Game] WHERE Id = ${id}`);
    return response.recordset as Game;
};

export const getGameByPlayerId = async (db: ConnectionPool, id: number): Promise<Game[]> => {
    const response = await db.request().execute(`getGameByPlayerId`);
    return response.recordset as Game[];
};

export const createGame = async (db: ConnectionPool): Promise<number> => {
    const response = await db.request().query(`createGame`);
    return response.rowsAffected[0];
};