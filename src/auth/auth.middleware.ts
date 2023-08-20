import MagicLoginStrategy from 'passport-magic-login';
import dotenv from 'dotenv';
dotenv.config();
//import { createTransport } from 'nodemailer';
import { createUserInput } from '../user/user.dtos';
import { createUser, findUser, findUserByEmail } from '../user/user.service';
import passport from 'passport';
import { createTransport } from 'nodemailer';
import { HydratedDocument } from 'mongoose';
import session from 'express-session';
import { NextFunction, Request, Response } from 'express';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    type IUser = import('../user/user.types').IUser;
    interface User extends HydratedDocument<IUser> {}
  }
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.isAuthenticated()) {
      next();
    }
    else {
      throw new Error('Not authenticated');
    }
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

const sessionMiddleware = session({
  //store: redisStore,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  name: 'sessionId',
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 30,
  },
});

const magicLogin = new MagicLoginStrategy({
  secret: process.env.MAGIC_LINK_SECRET as string,
  callbackUrl: '/api/auth/login/callback',
  sendMagicLink: async (email: string, href: string) => {
    await sendMail(email, href);
  },
  verify: async (payload, callback) => {
    callback(null, await validate(payload));
  },
  jwtOptions: {
    expiresIn: '5m',
  }
});

async function sendMail(destination: string, href: string) {
  const transporter = createTransport({
    host: process.env.NM_HOST as string,
    port: parseInt(process.env.NM_PORT as string),
    auth: {
      user: process.env.NM_USER as string,
      pass: process.env.NM_PASS as string,
    }
  });

  await transporter.sendMail({
    from: 'no-reply@example.com',
    to: destination, 
    subject: 'Auth Link',
    text: 'Click the link to login',
    html: `<b href="${process.env.DOMAIN_NAME + href}">Click the link to login</b>`,
  });
}

async function validate(payload: createUserInput) {
  let user;
  try {
    user = await findUserByEmail(payload.email);
  } catch (error) {
    user = await createUser(payload);
  }
  return user;
}

passport.use('magiclogin', magicLogin);

passport.deserializeUser((id: string, done) => { 
  findUser(id).then(user => done(null, user));
});

passport.serializeUser((user, done) => done(null, user.id));

export { isAuthenticated, sessionMiddleware, magicLogin  };