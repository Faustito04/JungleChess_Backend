import { Router } from "express";
import bodyParser from "body-parser";
import User from "../models/user";
import { getAll } from "../services/userService";
 
const router = Router();
const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
    try {
        const personajes: User[] = await getAll(req.app?.locals.db);
        res.status(200).json(personajes);
    } catch (err) {
        console.log(err);
        res.status(500).send("server error");
    }
});

export default router;
