import { match } from 'assert'
import mongoose, { Schema, Document } from 'mongoose'

export interface Message extends Document {
    content: string,
    createdAt: Date
}

export interface User extends Document {
    username: string,
    email: string,
    password: string,
    verifycode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean
    isAcceptingMessage: boolean,
    message: Message[]
}


const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required "],
        trim: true,
        unique: true
    },
    email: {
        type:String,
        match: [/([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/, 'Please use a valid email '],
        required: [true, "Email is required "],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is requied"]
    },
    verifycode: {
        type: String,
        required: [true, "verification code is requied"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Date expiry is requied"]
    },
    isAcceptingMessage: {
        type: Boolean,
        dafault: true
    },
    isVerified: {
        type: Boolean,
        dafault: false
    },
    message: {
        type: [MessageSchema]
    }
})

const UserModal = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));
export default UserModal;