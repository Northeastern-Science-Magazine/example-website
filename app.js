import express from "express";
import cors from "cors";
import helmet from "helmet";
import route from "./routes/pages.route.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

app.set("view engine", "ejs");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", route);

export default app;