import { Router, Request, Response } from "express";
import { register, login } from "../controllers/auth.controller";

const authRouter = Router()

authRouter.post(
    '/register',
    register
)

authRouter.post(
    '/login',
    login
)

authRouter.get(
    '/',
    async (req: Request, res: Response) => {
        res.redirect('/login')
    }
)

export { authRouter }