import sql, { ConnectionPool } from "mssql";
import Game from "../models/game"

export const getGameById = async (db: ConnectionPool, id: number): Promise<Game> => {
    const response = await db.request().query(`SELECT * FROM [Game] WHERE Id = ${id}`);
    return response.recordset as Game;
};//sobra

export const getGameByPlayerId = async (db: ConnectionPool, id: number): Promise<Game[]> => {
    const game = await db.request().input("userId", sql.Int, id).execute(`getGameByPlayerId`)
    return game.recordset as Game[];
};

export const getGameAndMoves = async (db: ConnectionPool, id: number): Promise<Game> => {
    const game = await db.request().query(`SELECT * FROM Game WHERE id = ${id}`)
    const moves = await db.request().input("gameId", sql.Int, id).execute("getMoves")
    return {...game.recordset, moves: moves.recordset} as Game;
};

export const createGame = async (db: ConnectionPool, game: Game ): Promise<number> => {
    const response = await db.request().input("gameId", sql.Int, game.gameId).input("date", sql.Int, game.date).query(`createGame`);
    return response.rowsAffected[0];
};