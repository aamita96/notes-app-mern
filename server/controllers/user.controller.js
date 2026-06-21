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