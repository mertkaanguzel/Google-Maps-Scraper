import MagicLoginStrategy from 'passport-magic-login';
import dotenv from 'dotenv';
dotenv.config();
//import { createTransport } from 'nodemailer';
import { createUserInput } from '../user/user.dtos';
import { createUser, findUserByEmail } from '../user/user.service';
import passport from 'passport';
import { createTransport } from 'nodemailer';

export const magicLogin = new MagicLoginStrategy({
  secret: process.env.MAGIC_LINK_SECRET as string,
  callbackUrl: '/api/auth/login/callback',
  sendMagicLink: async (email: string, href: string) => {
    await sendMail(email, href);
  },
  verify: async (payload, callback) => {
    callback(null, validate(payload));
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

passport.use('magiclogin' ,magicLogin);
