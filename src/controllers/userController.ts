import { Router } from "express";
import bodyParser from "body-parser";
import User from "../models/user";
import { createUser, deleteUserByName, getUserAll, getUserBy } from "../services/userService";
 
const router = Router();
const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
    try {
        const user: User[] = await getUserAll(req.app?.locals.db);
        console.log(user);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("error");
    }
});

router.get("/:name", async (req, res) => {
    try {
        const user: User = await getUserBy(req.app?.locals.db, "name", req.params.name);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("error");
    }
});

router.post("/", jsonParser, async (req, res) => {
    try {
        const rowsAffected: number = await createUser(req.app?.locals.db, req.body);
        res.status(200).json(rowsAffected);
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
