import { Router } from "express";
import bodyParser from "body-parser";
import User from "../models/user";
import { createUser, deleteUserByName, getUserAll, getUserBy } from "../services/userService";
 
const router = Router();
const jsonParser = bodyParser.json();

router.get("/all", async (req, res) => {
    try {
        const personajes: User[] = await getUserAll(req.app?.locals.db);
        res.status(200).json(personajes);
    } catch (err) {
        console.log(err);
        res.status(500).send("error");
    }
});

router.get("/:name", async (req, res) => {
    try {
        const personaje: User = await getUserBy(req.app?.locals.db, "name", req.params.name);
        res.status(200).json(personaje);
    } catch (err) {
        console.log(err);
        res.status(500).send("error");
    }
});

router.post("/", async (req, res) => {
    try {
        const rowsAffected: number = await createUser(req.app?.locals.db, req.body.user);
        res.status(200).send(rowsAffected);
    } catch (err) {
        console.log(err);
        res.status(500).send("error");
    }
});

router.delete("/:name", async (req, res) => {
    try {
        const rowsAffected: number = await deleteUserByName(req.app?.locals.db, req.params.name);
        res.status(200).send(rowsAffected);
    } catch (err) {
        console.log(err);
        res.status(500).send("error");
    }
});

export default router;
