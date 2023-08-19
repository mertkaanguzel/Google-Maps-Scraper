import { NextFunction, Request, Response, Router } from 'express';
import { validateInput } from '../utils/common.middleware';
import { callbackDto, createUserDto } from '../user/user.dtos';
import { magicLogin } from './auth.middleware';
import passport from 'passport';

export const authRouter = Router();

authRouter.post('/login', validateInput(createUserDto, 'body'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.destination = req.body.email;
    magicLogin.send(req, res);
    console.log(req.body.destination);
  } catch (error) {
    error.status = 401;
    next(error);
  }
});

authRouter.get('/login/callback', validateInput(callbackDto, 'query'), passport.authenticate('magiclogin'));

