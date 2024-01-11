import { Router } from "express";
import { getUsers } from "../controllers/user.controller";
import { adminGuard, verifyToken } from "../middlewares/auth.middleware";

const userRouter = Router()

userRouter.get(
    '/',
    verifyToken,
    adminGuard,
    getUsers
)

export { userRouter }