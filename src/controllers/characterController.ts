import { Router } from "express";
import bodyParser from "body-parser";
 
const router = Router();
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
    res.send("Hello World!") 
})

export default router;
