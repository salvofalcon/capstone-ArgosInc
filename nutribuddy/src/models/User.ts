// User.ts
import { Document, Schema, model } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    height?: number;
    weight?: number;
}

const userSchema = new Schema({
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    email: {type: String, required: true, unique: true },
    height: {type: Number, required: false},
    weight: {type: Number, required: false}
});

const User = model<IUser>('User', userSchema);

export default User;