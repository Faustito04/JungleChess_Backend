import sql, { ConnectionPool } from "mssql";
import UserStat from "../models/userStat"

export const getUserStatById = async (db: ConnectionPool, id: number): Promise<UserStat> => {
    const response = await db.request().query(`SELECT * FROM [UserStat] WHERE Id = ${id}`);
    return response.recordset as UserStat;
};//sobra

export const getGameByPlayerId = async (db: ConnectionPool, id: number): Promise<UserStat[]> => {
    const game = await db.request().input("userId", sql.Int, id).execute(`getGameByPlayerId`)
    return game.recordset as UserStat[];
};

export const getGameAndMoves = async (db: ConnectionPool, id: number): Promise<UserStat> => {
    const game = await db.request().query(`SELECT * FROM Game WHERE id = ${id}`)
    const moves = await db.request().input("gameId", sql.Int, id).execute("getMoves")
    return {...game.recordset, moves: moves.recordset} as UserStat;
};

export const createUsetStat = async (db: ConnectionPool, userStat: UserStat ): Promise<number> => {
    const response = await db.request().input("userId", sql.Int, userStat.userId).input("gamemodeId", sql.Int, userStat.gamemodeId)
    .input("name", sql.Int, userStat.name).input("value", sql.Int, userStat.value).query(`createUserStat`);
    return response.rowsAffected[0];
};