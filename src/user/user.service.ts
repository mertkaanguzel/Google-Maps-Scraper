import userModel from './user.entity';
import { createUserInput } from './user.dtos';

async function createUser(args: createUserInput) {
  const user = new userModel({
    ...args,
  });
  await user.save();
  return user;
}

async function findUser(id: string) {
  const user = await userModel.findById(id).exec();
  if (!user) throw new Error('User not found');
  return user;
}

async function findUserByEmail(email: string) {
  const user = await userModel.findOne({ email }).exec();
  if (!user) throw new Error('User not found');
  return user;
}



export { createUser, findUser, findUserByEmail };