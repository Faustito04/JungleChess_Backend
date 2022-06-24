import sql, { ConnectionPool } from "mssql";

export const createGameXUser = async (db: ConnectionPool, userId: number, gameId: string): Promise<number> => {
    const response = await db.request().input("gameId", sql.VarChar(40), gameId).input("userId", sql.Int, userId).query(`createGameXUser`);
    return response.rowsAffected[0];
};