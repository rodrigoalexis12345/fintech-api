import express from "express";
import morgan from "morgan";
import { PORT } from "./config.js";
import userRoutes from "./routes/users.routes.js";
// Conexiones
import cors from "cors";
//Conexiones

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(userRoutes);

app.listen(PORT);
console.log("Server on port", PORT);
