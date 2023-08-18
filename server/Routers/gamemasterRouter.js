// GameMaster
import Express from "express"
import { getProfile, registerGamemaster, signInGamemaster, uploadProfile } from "../Controllers/gameMasterController/Auth.js"
import { JwtConfig } from "../middlewares/jwtAuthentication.js"

const router = Express()

router.post('/register',registerGamemaster)
router.post('/sign-in',signInGamemaster)
router.post('/update-profile',JwtConfig,uploadProfile)


router.get('/get-image',JwtConfig,getProfile)
export default router