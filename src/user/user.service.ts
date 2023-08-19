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
  return await userModel.findById(id).exec();
}

async function findUserByEmail(email: string) {
  return await userModel.findOne({ email }).exec();
}



export { createUser, findUser, findUserByEmail };