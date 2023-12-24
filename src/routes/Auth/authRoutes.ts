import { Router } from "express";
import { handleLogin, handleSignUp } from "../../controllers/auth";

const router = Router();

router.post(`/register`, handleSignUp);
router.post(`/login`, handleLogin)
// router.post(`/login`, handleLogin)

export default router;
