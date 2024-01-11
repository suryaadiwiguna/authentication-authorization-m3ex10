import 'dotenv/config'
import express, { Request, Response } from 'express'
import { authRouter } from '../routers/auth.router'
import { userRouter } from '../routers/user.router'

const app = express()

//Middleware
app.use(express.json())

//Route
app.use('/auth', authRouter)
app.use('/user', userRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('hi you are in the Root')
})

app.listen(process.env.LISTEN_PORT, () => {
    console.log('Server started on port: ', process.env.LISTEN_PORT)
})