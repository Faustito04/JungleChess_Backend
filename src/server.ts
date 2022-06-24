import express, { Application } from "express";
import { ConnectionPool } from "mssql";
import bodyParser from "body-parser";
import router from "./utils/router";
import config from "./utils/database";
import ioServer from "./io";

(async () => {
	try {
		const app: Application = router(express());
		const port = 8080 || process.env.PORT;

		app.use(express.json());
		app.use(bodyParser.json());

		const appPool = new ConnectionPool(config);
		app.locals.db = await appPool.connect();

		app.get("*", (_, res) => {
			res.sendFile(__dirname + '/index.html');
		});

		app.listen(port, () => {
			console.log(`Server running on http://localhost:${port}`);
		});

		ioServer.listen(port + 1, () => {
			console.log(`IO Server running on http://localhost:${port + 1}`);
		})
	} catch (err) {
		console.log(err);
	}
})();
