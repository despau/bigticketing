import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
}

// To add the currentUser object to the Request Interface
// provided to us by express
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = ( req: Request, res: Response, next: NextFunction )  => {
    if (!req.session?.jwt) {
        return next();
    }

    try {

        const payload = jwt.verify(
            req.session.jwt,
            process.env.JWT_KEY!
        ) as UserPayload;

        req.currentUser = payload;

    } catch (err) {}

    next();
}