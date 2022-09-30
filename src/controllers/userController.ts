import { Router } from "express";
import bodyParser from "body-parser";
import User from "../models/user";
import { createUser} from "../services/userService";
import { deleteBy, getAll, getBy } from "../services/genericService";
 
const router = Router();
const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
    try {
        const user: User[] = await getAll(req.app?.locals.db, "User");
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("error");
    }
});

router.get("/:name", async (req, res) => {
    try {
        console.log(req.params.name)
        const user: User = await getBy(req.app?.locals.db, "[User]", "name", req.params.name);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json("error");
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

router.delete("/:id", async (req, res) => {
    try {
        const rowsAffected: number = await deleteBy(req.app?.locals.db, "[User]", "name", req.params.id);//cambiar
        res.status(200).send(rowsAffected);
    } catch (err) {
        console.log(err);
        res.status(500).send("error");
    }
});

export default router;