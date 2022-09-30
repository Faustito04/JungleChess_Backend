import sql, { ConnectionPool } from "mssql";

export const getAll = async (
    db: ConnectionPool,
    table: string,
    rows: number = 10,
    page: number = 0
): Promise<any> => {
    const response = await db.request().query(`SELECT * FROM OFFSET ${rows * (page + 1)} ROWS FETCH NEXT ${rows} ROWS ONLY`);
    console.log(`SELECT * FROM ${table} OFFSET ${rows * (page + 1)} ROWS FETCH NEXT ${rows} ROWS ONLY`)
    return response.recordset
};

export const getAllLike = async (
    db: ConnectionPool,
    orderBy: string,
    rows: number = 10,
    page: number = 0,
    table: string,
    value: string | number,
    parameter: string
): Promise<any> => {
    const response = await db.request().query(`SELECT * FROM ${table} ${value ? "WHERE " + parameter + " LIKE %" + value + "%" : ""} ORDER BY ${orderBy} OFFSET ${rows * (page + 1)} ROWS FETCH NEXT ${rows} ROWS ONLY`);
    console.log(`SELECT * FROM ${table} ${value ?? "WHERE " + parameter + " LIKE %" + value + "%"} ORDER BY ${orderBy} OFFSET ${rows * (page + 1)} ROWS FETCH NEXT ${rows} ROWS ONLY`)
    return response.recordset
};

export const getAllBy = async (
    db: ConnectionPool,
    orderBy: string,
    table: string,
    rows: number = 10,
    page: number = 0,
    value: string | number,
    parameter: string
): Promise<any> => {
    const response = await db.request().query(`SELECT * FROM ${table} ${value ? "WHERE " + parameter + " LIKE %" + value + "%" : ""} ORDER BY ${orderBy} OFFSET ${rows * (page + 1)} ROWS FETCH NEXT ${rows} ROWS ONLY`);
    console.log(`SELECT * FROM ${table} ${value ?? "WHERE " + parameter + "  = " + value} ORDER BY ${orderBy} OFFSET ${rows * (page + 1)} ROWS FETCH NEXT ${rows} ROWS ONLY`)
    return response.recordset
};

export const getBy = async (db: ConnectionPool, table: string, parameter: string, value: number | string): Promise<any> => {
    console.log(`SELECT * FROM ${table} WHERE ${parameter} = ${value}`)
    const response = await db.request().query(`SELECT * FROM ${table} WHERE ${parameter} = ${value}`);
    return response.recordset;
};

export const deleteBy = async (
    db: ConnectionPool, table: string, parameter: string, value: number | string
): Promise<number> => {
    console.log("hola")
    const response = await db
        .request().query(`DELETE FROM ${table} WHERE ${parameter} = ${value}`);
    return response.rowsAffected[0]
};

export const deleteLike = async (
    db: ConnectionPool, table: string, parameter: string, value: string
): Promise<number> => {
    const response = await db
        .request().query(`DELETE FROM ${table} WHERE ${parameter} LIKE %${value}%`);
    return response.rowsAffected[0]
};