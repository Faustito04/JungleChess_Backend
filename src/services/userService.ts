import sql, { ConnectionPool } from "mssql";
import User from "../models/user"
import { getCurrDate } from "../utils/date";

export const getUserBy = async (db: ConnectionPool, parameterValue: string | number, parameter: string): Promise<User> => {
    const response = await db.request().query(`SELECT * FROM [User] WHERE ${parameter} = ${parameterValue}`);
    return response.recordset as User;
};

export const getUserAllPaginado = async (
    db: ConnectionPool, 
    orderBy: string, 
    rows: number = 10, 
    page: number = 0, 
    parameterValue?: string | number, 
    parameter?: string
): Promise<User[]> => {
    const response = await db.request().query(`SELECT * FROM User ${parameterValue ?? "WHERE " + parameter + " LIKE %" + parameterValue + "%"} ORDER BY ${orderBy} OFFSET ${rows * (page + 1)} ROWS FETCH NEXT ${rows} ROWS ONLY`);
    return response.recordset as User[]
};

export const getUserAll = async (db: ConnectionPool): Promise<User[]> => {
    const response = await db
        .request()
        .query("SELECT * FROM [User]");
    return response.recordset as User[];
};//sobra

export const createUser = async (
    db: ConnectionPool,
    user: User
): Promise<number> => {
    const response = await db
        .request()
        .input("name", sql.VarChar(30), user.name)
        .input("imageUrl", sql.VarChar(500), user.imageUrl)
        .input("description", sql.VarChar(600), user.description)
        .input("service", sql.VarChar(30), user.service)
        .execute(`createUser`);
    return response.rowsAffected[0];
};

export const deleteUserByName = async (
    db: ConnectionPool,
    id: string
): Promise<number> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .execute(`deleteUserById`);
    return response.rowsAffected[0]
};

export const updateUserStatus = async (
    db: ConnectionPool,
    status: string,
    id: number
): Promise<number> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .input("status", sql.Char(1), status)
        .execute(`updateUserSatus`);
    return response.rowsAffected[0];
};

export const updateUserStreak = async (
    db: ConnectionPool,
    id: number,
    streak: number
): Promise<number> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .input("streak", sql.Int, streak)
        .execute(`updateUserStreak`);
    return response.rowsAffected[0];
};

export const updateUserDescription = async (
    db: ConnectionPool,
    id: number,
    description: string
): Promise<number> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .input("description", sql.VarChar(600), description)
        .execute(`updateUserDescription`);
    return response.rowsAffected[0];
};

export const updateUserFriendCount = async (
    db: ConnectionPool,
    id: number,
    friendCount: number
): Promise<number> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .input("friendCount", sql.Int, friendCount)
        .execute(`updateUserFriendCount`);
    return response.rowsAffected[0];
};

export const updateUserImageUrl = async (
    db: ConnectionPool,
    id: number,
    imageUrl: string
): Promise<number> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .input("imageUrl", sql.VarChar(500), imageUrl)
        .execute(`updateUserImageUrl`);
    return response.rowsAffected[0];
};

export const updateUserLastConnected = async (
    db: ConnectionPool,
    id: number
): Promise<number> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .execute(`updateUserLastConnected`);
    return response.rowsAffected[0];
};

export const updateUserName = async (
    db: ConnectionPool,
    id: number,
    name: string
): Promise<number> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .input("name", sql.VarChar(30), name)
        .execute(`updateUserName`);
    return response.rowsAffected[0];
};

export const updateUserRole = async (
    db: ConnectionPool,
    id: number,
    role: string
): Promise<number> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .input("role", sql.Char(1), role)
        .execute(`updateUserRole`);
    return response.rowsAffected[0];
};
