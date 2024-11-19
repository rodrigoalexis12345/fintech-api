import express from "express";
import morgan from "morgan";
import { PORT } from "./config.js";
import userRoutes from "./routes/users.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(userRoutes);

app.listen(PORT);
console.log("Server on port", PORT);
