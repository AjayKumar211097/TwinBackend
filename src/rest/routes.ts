import { Router } from "express";
import { db } from "../utils/IAppDatabase";

export const router = Router();

router.get('/charges', (req, res) => {
    res.json({ charges: db.charges });
});
// Add more routes as needed