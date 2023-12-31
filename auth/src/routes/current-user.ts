import express, { Request, Response } from 'express';
import { requireAuth } from './../middlewares/require-auth';

import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req: Request, res: Response)=>{
    res.send( { currentUser: req.currentUser || null } );
});

export { router as currentUserRouter };