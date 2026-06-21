import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    pic: {
        type: String,
        required: true,
        default: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.svg"
    }
},
    {
        timestamps: true
    }
);

UserSchema.pre('save', async function (next,) {
    const user = this;

    if (!user.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.__v;
    return userObject;
}

UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    // user.tokens = user.tokens.concat({ token });

    // await user.save();

    return token;
}

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password!');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid email or password!');
    }

    return user;
}

const User = mongoose.model('users', UserSchema);
export default User;