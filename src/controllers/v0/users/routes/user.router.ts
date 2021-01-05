/**
 * @overview This file contains the following functions and routes
 *
 * baserURL:  /api/v0/users/
 *
 * Routes
 *
 * FindUserById: (get /:id) finds a user by id
 *
 * Note: Auth router is accessed via this file
 *
 */


import {Router, Request, Response} from 'express';

import {User} from '../models/User';
import {AuthRouter} from './auth.router';

const router: Router = Router();

router.use('/auth', AuthRouter);

//possible error -incomplete route?
router.get('/');

router.get('/:id', async (req: Request, res: Response) => {
  const {id} = req.params;
  const item = await User.findByPk(id);
  res.send(item);
});

export const UserRouter: Router = router;
