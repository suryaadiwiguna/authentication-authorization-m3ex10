type User = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
};

declare namespace Express {
    export interface Request {
        user?: User
    }
}