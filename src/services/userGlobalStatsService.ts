import sql, { ConnectionPool } from "mssql";
import User from "../models/user";
import UserGlobalStats from "../models/userGlobalStats";
import { getCurrDate } from "../utils/date";

export const createGlobalStats = async (
    db: ConnectionPool,
    id: number
): Promise<any> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .input("gamesPlayed", sql.Int, 0)
        .input("gamesWon", sql.Int, 0)
        .input("gamesTied", sql.Int, 0)
        .input("gamesLost", sql.Int, 0)
        .execute(`createGlobalStats`);
    return response.rowsAffected[0];
}

export const updateGlobalStats = async (
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
    id: number,
    result: string
): Promise<any> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .input("stat", sql.VarChar(10), `games${result}`)
        .execute(`updateGlobalStatsGames`);
    return response.rowsAffected[0];
}

export const updateHoursPlayed = async (
    db: ConnectionPool,
    id: number,
    result: string
): Promise<any> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .execute(`updateGlobalStatsHoursPlayed`);
    return response.rowsAffected[0];
}

export const getGamemodeStatsById = async (
    db: ConnectionPool,
    id: number
): Promise<UserGlobalStats> => {
    const response = await db
        .request()
        .query("SELECT * FROM [UserGlobalStats] WHERE userId = " + id);
    return response.recordset as UserGlobalStats;
}