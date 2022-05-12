import { Application } from "express";
import { readdirSync } from "fs";
import { join } from "path";

const controllerFolder = join(__dirname, "..", "controllers");

const router = (app: Application): Application => {
	readdirSync(controllerFolder).forEach((file: string) => {
		if (!/Controller/.test(file)) return;
		app.use(
			`/${file.split("Controller")[0]}`,
			require(join(controllerFolder, file)).default
		);
	});
	return app;
};

export default router;
