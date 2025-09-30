import express from "express";
import bodyParser from "body-parser";
import { router } from "./routes";

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api", router);

const PORT = process.env.REST_PORT || 3000;
app.listen(PORT, () => {
    console.log(`REST API running on port ${PORT}`);
});
