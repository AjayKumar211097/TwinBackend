import { Router } from "express";
import { getChargerStatus } from "../utils/dbControllers";

export const router = Router();

router.get("/charger-status", getChargerStatus);
// Add more routes as needed