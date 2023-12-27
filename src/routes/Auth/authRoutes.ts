import { Router } from "express";
import { handleLogin, handleSignUp, handleTokenValidation } from "../../controllers/auth";

const router = Router();

router.post(`/register`, handleSignUp);
router.post(`/login`, handleLogin);
router.post(`/token_validation`, handleTokenValidation);

export default router;
