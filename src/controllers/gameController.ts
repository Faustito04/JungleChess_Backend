import { Router } from "express";
import bodyParser from "body-parser";
import Game from "../models/Game";
import { createGame, getGameAndMoves, getGameByPlayerId } from "../services/gameService";
 
const router = Router();
const jsonParser = bodyParser.json();

router.get("/all/:id", async (req, res) => {
    try {
        const games: Game[] = await getGameByPlayerId(req.app?.locals.db, parseInt(req.params.id));
        res.status(200).json(games);
    } catch (err) {
        console.log(err);
        res.status(500).send("error");
    }
});

router.get("/all/:id", async (req, res) => {
    try {
        const game: Game = await getGameAndMoves(req.app?.locals.db, parseInt(req.params.id));
        res.status(200).json(game);
    } catch (err) {
        console.log(err);
        res.status(500).send("error");
    }
});

router.post("/", async (req, res) => {
    try {
        const rowsAffected: number = await createGame(req.app?.locals.db);
        res.status(200).send(rowsAffected);
    } catch (err) {
        console.log(err);
        res.status(500).send("error");
    }
});

export default router;
