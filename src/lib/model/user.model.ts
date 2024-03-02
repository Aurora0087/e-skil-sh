import { Schema, model, models } from "mongoose";

export interface IUser extends Document {
    _id: string;
    name: string;
    firstName?: string;
    lastName?: string;
    email: string;
    image?: string;
    profilebg?: string;
    bio?: string;
    joined: Date;
    followers: Schema.Types.ObjectId[];
    following: Schema.Types.ObjectId[];
    liked: Schema.Types.ObjectId[];
    role: 'ADMIN'|'USER'
}

const UserSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,

    image: {
        type: String,
        required: true
    },
    bio:String,
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    bookmark: [
        {
            type: Schema.Types.ObjectId,
            ref: ""
        }
    ],
    liked: [
        {
            type: Schema.Types.ObjectId,
            ref: ""
        }
    ],
    emailVerified: {},
    role: {
        type: String,
        default: "USER"
    }
})

const User = models.User || model('User', UserSchema);

export default User;