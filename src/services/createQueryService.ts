import sql, { ConnectionPool } from "mssql";

const connections = ["GlobalStat-Gamemode", "UserStat-Gamemode", "UserStat-User", "Relationship-User", 
"Suspension-User", "User-GameXUser", "Game-GameXUser", "Game-Move"];

const connectionsId = ["gamemodeId", "gamemodeId", "userId", 
"gameId-user1_user2", "userId-suspendedId_suspenderId", 
"userId", "gameId", "gameId"];

const createInnerJoin1 = (tables: string[], table: number) => {
    let table1 = tables[table];
    let table2 = tables[table+1];
    let relation = "";

    let i = 0; 
    let completed = false

    while (i < connections.length && completed === false) {
        if (connections[i].includes(table1) && connections[i].includes(table2)) {
            completed = true;
            relation = connectionsId[i];
        }
        i++;
    }

    if (i === connections.length) return "";

    if (!connectionsId.includes("-")) {
        return `INNER JOIN ${table2} ON ${table2}.${relation} = ${table1}.${relation} `
    } else {
        let ids = relation.split("-")
        let pares = ids[2].split("_")
        return `INNER JOIN ${table2} AS a ON ${table2}.${pares[0]} = ${table1}.${ids[0]} 
        INNER JOIN ${table2} AS b ON ${table2}.${pares[1]} = ${table1}.${ids[0]} `
    }
}

export const selectQuery = async (tables: string[], condition: string, parameters: string = "*") => {
    let cantTables = tables.length;
    let innerJoin = "";

    if (new Set(tables).size !== tables.length) {
        tables.pop()
    } 
    
    let times = 0;
    while (cantTables > 1) {
        innerJoin += createInnerJoin1(tables, times);
        times++;
        cantTables--;
    }

    let query = `SELECT ${parameters} FROM ${tables[0]} ${innerJoin}WHERE ${condition}`;

    console.log(query);
}