import Express, { json, urlencoded } from "express";
import cors from "cors"
import env from "dotenv"
import { dbConnection } from "./Connections/db.js";
import api from "./api.js";
env.config()
dbConnection(process.env.DATABASEcONNECTION)
const app = Express()

const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(Express.json())
app.use(urlencoded({ extended: true }))
app.use(json())


app.use("/*", (req, res, next) => {
    console.log(req.method, req.url)
    next()
})
app.use("/api", api)

app.get("/", (req, res) => {
    res.send("hello world")
})
const port = process.env.PORT || 4001;
app.listen(port, () => console.log("server is running on PORT " + port))