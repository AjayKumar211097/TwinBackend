import { Request, Response } from "express";

// Fake DB data
let chargerStatus = { connected: false, power: 0 };

export const getChargerStatus = (req: Request, res: Response) => {
    res.json(chargerStatus);
};

// Called from WebSocket service
export const updateChargerStatus = (status: any) => {
    chargerStatus = status;
};
