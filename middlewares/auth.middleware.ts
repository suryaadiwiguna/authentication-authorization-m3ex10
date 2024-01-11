import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

type User = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
};

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        // console.log(req.headers)
        const token = req.headers.authorization?.replace("Bearer ", "")
        // console.log(token)

        if (!token) {
            return res.status(400).send("Unauthorized")
        }

        const verifiedUser = jwt.verify(token, 'psst')
        if (!verifiedUser) return res.status(401).send("Unauthorized")
        req.user = verifiedUser as User

        next()

    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: {
                msg: "Verification error",
                error: (error as Error).message
            }
        })
    }
}

export async function adminGuard(req: Request, res: Response, next: NextFunction) {
    try {
        // console.log("adminGuard")
        console.log(req.user)
        if (req.user?.role !== 'admin') return res.status(401).send("Unauthorized")

        next()

    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: "Admin authorization error",
            error: (error as Error).message
        })
    }
}