/**
 * @overview This file contains the following functions and routes
 *
 * Middleware:
 *
 * Users: Connects to the users and auth routes
 *
 * Routes
 *
 * Version (get / ) returns the routes version
 *
 */

import {Router, Request, Response} from 'express';
import {UserRouter} from './users/routes/user.router';

const router: Router = Router();

router.use('/users', UserRouter);

router.get('/', async (req: Request, res: Response) => {
  res.send(`V0`);
});

export const IndexRouter: Router = router;
