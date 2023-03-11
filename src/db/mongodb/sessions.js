import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true  
    }
})

UserSchema.pre('save', async function(next) {
    try {
        let hash;

        let salt = bcrypt.genSaltSync(10);

        hash = bcrypt.hashSync(this.password, salt);

        this.password = hash

        next()
    } catch (err) {
        return next(err);
    }
})

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;