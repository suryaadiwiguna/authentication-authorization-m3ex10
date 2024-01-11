import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export async function getUsers(req: Request, res: Response) {
    const prisma = new PrismaClient();
    try {
        const users = await prisma.user.findMany()

        return res.status(200).send(
            {
                isSuccess: true,
                code: 1,
                msg: "Login is success",
                data: {
                    users
                }
            }
        )
    } catch (error) {
        // console.log(error)
        return res.status(500).send(
            {
                error: {
                    message: "Get users data error",
                    error: (error as Error).message
                }
            }
        )
    }
}