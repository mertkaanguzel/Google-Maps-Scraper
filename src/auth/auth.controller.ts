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
  } catch (error) {
    error.status = 401;
    next(error);
  }
});

authRouter.get('/login/callback', validateInput(callbackDto, 'query'), passport.authenticate('magiclogin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ id: req.user?.id });
  } catch (error) {
    error.status = 401;
    next(error);
  }
});

authRouter.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
  try { 
    req.logOut(() => {
      req.session.destroy(() => {
        res.clearCookie('sessionId');
        res.sendStatus(204);
      });
      
    });
  } catch (error) {
    error.status = 401;
    next(error);
  }
});

