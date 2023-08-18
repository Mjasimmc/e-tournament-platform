import  Express  from "express";
import PlayerRouter from "./Routers/PlayerRouter.js"
import gamemasterRouter from "./Routers/gamemasterRouter.js"
import tournamentRouter from "./Routers/tournamentRouter.js"
const api = Express()


api.use("/player",PlayerRouter)
api.use("/gamemaster",gamemasterRouter)
api.use("/tournament",tournamentRouter)

export default api  