import sql, { ConnectionPool } from "mssql";
import UserGamemodeStats from "../models/userGamemodeStats";

export const createGamemodeStats = async (
    db: ConnectionPool,
    stats: UserGamemodeStats
): Promise<any> => {
    const response = await db
        .request()
        .input("userId", sql.Int, stats.userId)
        .input("gamemodeId", sql.Int, stats.gamemodeId)
        .input("elo", sql.Int, stats.elo)
        .execute(`createGamemodeStats`);
    return response.rowsAffected[0];
}

export const updateGamemodeStats = async (//no hace falta creo
    db: ConnectionPool,
    id: number,
    stat: string,
    value: any
): Promise<any> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .input("value", sql.VarChar(30), value)
        .input("stat", sql.Int, stat)
        .execute(`updateGlobalStats`);
    return response.rowsAffected[0];
}

export const updateGames = async (
    db: ConnectionPool,
    stats: UserGamemodeStats,
    result: string
): Promise<any> => {
    const response = await db
        .request()
        .input("userId", sql.Int, stats.userId)
        .input("gamemodeId", sql.Int, stats.gamemodeId)
        .input("stat", sql.VarChar(10), `games${result}`)
        .execute(`updateGamemodeStatsGames`);
    return response.rowsAffected[0];
}

export const updateElo = async (
    db: ConnectionPool,
    stats: UserGamemodeStats
): Promise<any> => {
    const response = await db
        .request()
        .input("userId", sql.Int, stats.userId)
        .input("gamemodeId", sql.Int, stats.gamemodeId)
        .input("elo", sql.Int, stats.elo)
        .execute(`updateGlobalStatsElo`);
    return response.rowsAffected[0];
}

export const getGamemodeStatsByUserId = async (
    db: ConnectionPool,
    id: number
): Promise<UserGamemodeStats[]> => {
    const response = await db
        .request()
        .query("SELECT * FROM [UserGamemodeStats] WHERE userId = " + id);
    return response.recordset as UserGamemodeStats[];
}

export const getGamemodeStatsByBothId = async (
    db: ConnectionPool,
    userId: number,
    gamemodeId: number
): Promise<UserGamemodeStats[]> => {
    const response = await db
        .request()
        .query(`SELECT * FROM [UserGamemodeStats] WHERE userId = ${userId} AND gamemodeId = ${gamemodeId}` );
    return response.recordset as UserGamemodeStats[];
}