import sql, { ConnectionPool } from "mssql";

export const getAllLike = async (
    db: ConnectionPool, 
    orderBy: string, 
    rows: number = 10, 
    page: number = 0, 
    table: string,
    parameterValue?: string | number, 
    parameter?: string
): Promise<any> => {
    const response = await db.request().query(`SELECT * FROM ${table} ${parameterValue ?? "WHERE " + parameter + " LIKE %" + parameterValue + "%"} ORDER BY ${orderBy} OFFSET ${rows * (page + 1)} ROWS FETCH NEXT ${rows} ROWS ONLY`);
    console.log(`SELECT * FROM ${table} ${parameterValue ?? "WHERE " + parameter + " LIKE %" + parameterValue + "%"} ORDER BY ${orderBy} OFFSET ${rows * (page + 1)} ROWS FETCH NEXT ${rows} ROWS ONLY`)
    return response.recordset
};

export const getAllBy = async (
    db: ConnectionPool, 
    orderBy: string, 
    rows: number = 10, 
    page: number = 0, 
    table: string,
    parameterValue?: string | number, 
    parameter?: string
): Promise<any> => {
    const response = await db.request().query(`SELECT * FROM ${table} ${parameterValue ?? "WHERE " + parameter + " LIKE %" + parameterValue + "%"} ORDER BY ${orderBy} OFFSET ${rows * (page + 1)} ROWS FETCH NEXT ${rows} ROWS ONLY`);
    console.log(`SELECT * FROM ${table} ${parameterValue ?? "WHERE " + parameter + "  = " + parameterValue} ORDER BY ${orderBy} OFFSET ${rows * (page + 1)} ROWS FETCH NEXT ${rows} ROWS ONLY`)
    return response.recordset
};

export const getBy = async (db: ConnectionPool, table: string, value: number | string, parameter: string): Promise<any> => {
    const response = await db.request().query(`SELECT * FROM ${table} WHERE ${parameter} = ${value}`);
    return response.recordset;
};

export const deleteBy = async (
    db: ConnectionPool, table: string, value: number | string, parameter: string
): Promise<number> => {
    const response = await db
        .request().query(`DELETE FROM ${table} WHERE ${parameter} = ${value}`);
    return response.rowsAffected[0]
};

export const deleteLike = async (
    db: ConnectionPool, table: string, value: string, parameter: string
): Promise<number> => {
    const response = await db
        .request().query(`DELETE FROM ${table} WHERE ${parameter} LIKE %${value}%`);
    return response.rowsAffected[0]
};