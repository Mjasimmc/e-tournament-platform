// Player
import Express from "express";
import {
    getProfile,
    registerPlayer,
    signInPlayer,
    uploadProfile
} from "../Controllers/PlayerController/Player.js";

import { JwtConfig } from "../middlewares/jwtAuthentication.js"

const router = Express()
// for registering a new Player also gives token for sign In
router.post('/register', registerPlayer)

// for signIn a player and creating a new token
router.post('/sign-in', signInPlayer)

// get useDetails with token
router.get('/get-image',JwtConfig,getProfile)
// updating Image
router.post('/update-profile',JwtConfig,uploadProfile)

export default router
