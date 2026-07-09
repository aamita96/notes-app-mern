import User from "../models/usermodel.js";

export const registerUser = async (req, res, next) => {
    const { name, email, password, pic } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        const err = new Error("User already exists");
        err.status = 400;
        throw err;
    }

    let user;
    try {
        user = await User.create({
            name,
            email,
            password,
            pic
        });
    } catch (error) {
        if (error.code === 11000) {
            const err = new Error("Email already in use");
            err.status = 409;
            throw err;
        }
        throw error;
    }

    const token = await user.generateAuthToken();

    if (user) {
        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
            },
            token
        });
    } else {
        const err = new Error("Something wen't wrong while registering user!");
        err.status = 500;
        throw err;
    }
}

export const authUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (error) {
        const err = new Error(error.message);
        err.status = 400;
        throw err;
    }
}

export const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            const err = new Error("User not found!");
            err.status = 404;
            throw err;
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.pic = req.body.pic || user.pic;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        const token = await updatedUser.generateAuthToken();

        res.json({
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                pic: updatedUser.pic,
                isAdmin: updatedUser.isAdmin,
            },
            token
        });
    } catch (error) {
        if (error.code === 11000) {
            error = new Error("Email already in use");
            error.status = 409;
        }

        next(error);
    }
}