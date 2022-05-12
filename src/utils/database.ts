import sql from "mssql";
import "dotenv/config";

const config: sql.config = {
	user: process.env.DB_USR,
	password: process.env.DB_PWD,
	database: process.env.DB_NAME,
	server: process.env.DB_SERVER || "localhost",
	options: {
		trustServerCertificate: true,
		trustedConnection: true,
	},
};

export default config;
