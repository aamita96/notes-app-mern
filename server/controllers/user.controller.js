import User from "../models/usermodel.js";

export const registerUser = async (req, res, next) => {
    const { name, email, password, pic } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        const err = new Error("User already exists");
        err.status = 400;
        throw err;
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    });

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
        res.status(500);
        throw new Error("Something wen't wrong while registering user!");
    }
}

export const authUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
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
        next(error);
    }
}