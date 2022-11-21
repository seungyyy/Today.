import { Schema, model } from 'mongoose';

interface IUser {
  email: string;
  password: string;
  salt: string;
  nickname: string;
  statuis: boolean
}

const user = new Schema<IUser>({
  email: {type: String, required: true},
  password: {type: String, required: true},
  salt: {type: String, required: true},
  nickname: {type: String, required: true},
  statuis: {type: Boolean, required: false},
})

const User = model<IUser>("User", user);

export { User }
