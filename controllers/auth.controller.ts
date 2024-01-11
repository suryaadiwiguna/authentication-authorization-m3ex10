import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { compare, genSalt, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

type User = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
};

const prisma = new PrismaClient();

export async function register(req: Request, res: Response) {
    // console.log(req.body)
    if (!Object.keys(req.body).length) return res.status(400).send({
        isSuccess: false,
        code: -1,
        msg: "Body cannot be empty",
        data: null
    })

    const { firstName, lastName, email, password }: User = req.body

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (existingUser) return res.status(400).send({
            isSuccess: false,
            code: 0,
            msg: "The email has been used by a registered account",
            data: null
        });

        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)
        const newUser = await prisma.user.create(
            {
                data: {
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword
                }
            }
        )

        return res.status(200).send(
            {
                isSuccess: true,
                code: 1,
                msg: "Account created successfully",
                data: newUser
            }
        )

    } catch (error) {
        return res.status(500).send(error)
    }
}

export async function login(req: Request, res: Response) {
    //Handle empty body
    if (!Object.keys(req.body).length) return res.status(400).send({
        isSuccess: false,
        code: -1,
        msg: "Body cannot be empty",
        data: null
    })

    //Destructuring
    console.log(req.body)
    const { email, password }: User = req.body

    try {
        //Check if the email exists
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        //Handling email does not exist
        if (!user) return res.status(400).send({
            isSuccess: false,
            code: -1,
            msg: "Invalid email or password",
            data: null
        })

        //If email exists, compare the password from user with the hashed passw from the db
        const isValidPassword = await compare(password, user.password);

        if (!isValidPassword) return res.status(400).send({
            isSuccess: false,
            code: -1,
            msg: "Invalid email or password",
            data: null
        })

        const jwtPayload = { email: user.email, role: user.role }
        console.log(jwtPayload)
        const token = sign(jwtPayload, 'psst', { expiresIn: "10" })

        return res.status(200).send(
            {
                isSuccess: true,
                code: 1,
                msg: "Login is success",
                data: {
                    user,
                    token
                }
            }
        )

    } catch (error) {
        return res.status(500).send(error)
    }
}