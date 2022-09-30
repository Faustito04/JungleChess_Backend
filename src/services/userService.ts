import sql, { ConnectionPool } from "mssql";
import User from "../models/user"

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
        .input("birthDate", sql.Date, user.birthDate)
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
