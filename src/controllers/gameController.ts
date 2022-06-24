import { Router } from "express";
import bodyParser from "body-parser";
import Game from "../models/Game";
import { createGame, getGameAndMoves, getGameByPlayerId } from "../services/gameService";
import { createGameXUser } from "../services/gameXUserService";
 
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
        let game = {
            id: "",//uuid
            date: req.body.date
        }
        let ids = req.body.userIds

        const rowsAffected: number = await createGame(req.app?.locals.db, game);

        const promises = ids.map((id: number) => async () => await createGameXUser(req.app?.locals.db, id, game.id))
 
        await Promise.all(promises);
        
        res.status(200).send(rowsAffected);
    } catch (err) {
        console.log(err);
        res.status(500).send("error");
    }
});

export default router;
