import { Router } from "express";
import bodyParser from "body-parser";
import Gamemode from "../models/gamemode";
import { createGamemode } from "../services/gamemodeService";

const router = Router();
const jsonParser = bodyParser.json();

router.post("/", jsonParser, async (req, res) => {
    try {
        const rowsAffected: number = await createGamemode(req.app?.locals.db, req.body);
        
        res.status(200).send(rowsAffected);
    } catch (err) {
        console.log(err);
        res.status(500).send("error");
    }
});