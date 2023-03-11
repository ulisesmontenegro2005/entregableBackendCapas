import UserModel from './../db/mongodb/sessions.js';
import bcrypt from 'bcrypt';

const getUserByUsername = async (username) => {
    const user = await UserModel.findOne({'username': username}, {__v: 0, _id: 0, password: 0});
    return user
}

const getCompleteUser = async (username) => {
    const user = await UserModel.findOne({'username': username});
    return user
}

const createUserPersistence = async (obj) => {
    const newUser = await UserModel.create(obj)
}

const comparePassBcrypt = async (pass1, pass2) => {
    return await bcrypt.compare(pass1, pass2);
}

export {
    getUserByUsername,
    createUserPersistence,
    comparePassBcrypt,
    getCompleteUser
}
