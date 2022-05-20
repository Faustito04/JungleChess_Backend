import sql, { ConnectionPool } from "mssql";
import User from "../models/user"
 
export const getAll = async (db: ConnectionPool): Promise<User[]> => {
    const response = await db.request().query("SELECT * FROM JCUser");
    return response.recordset as User[];
};

export const getById = async (db: ConnectionPool, id: number): Promise<User> => {
    const response = await db.request().query(`SELECT * FROM JCUser WHERE Id = ${id}`);
    return response.recordset as User;
};

export const create = async (
    db: ConnectionPool,
    user: User
): Promise<number> => {
    const response = await db
        .request()
        .input("name", sql.VarChar(30), user.name)
        .input("status", sql.Char, "D")
        .input("imageUrl", sql.VarChar(500), user.imageUrl)
        //.input("creationDate", sql.Int, getCurrentDate())
        .input("role", sql.Char, user.role)
        .input("description", sql.VarChar(600), user.description)
        .input("typeOfUser", sql.VarChar(30), user.typeOfUser)
        .input("service", sql.VarChar(30), user.service)
        .input("dayStreak", sql.Int, 1)
        .input("friendCount", sql.Int, 0)
        .query(`INSERT INTO JCUsers (name, status, imageUrl, role, description, typeOfUser, 
            service, dayStreak, friendCount, creationDate) 
            VALUES (@name, @status, @imageUrl, @role, @description, @typeOfUser, 
                @service, @dayStreak, @friendCount, @creationDate)`);
    return response.rowsAffected[0];
};
 
export const updateStatus = async (
    db: ConnectionPool,
    status: string,
    id: number
): Promise<number> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .input("nombre", sql.VarChar(255), status)
        .execute(`UPDATE `);
    return response.rowsAffected[0];
};
 
// export const deleteById = async (
//     db: ConnectionPool,
//     id: number
// ): Promise<number> => {
//     const response = await db
//         .request()
//         .input("id", sql.Int, id)
//         .execute(`deleteusersById`);
//     return response.rowsAffected[0]
// };
