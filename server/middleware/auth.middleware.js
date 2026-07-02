import User from "../models/usermodel.js";
import JWT from "jsonwebtoken";
import 'dotenv/config';

const auth = async (req, res, next) => {
    try {
        const TOKEN = req.headers.authorization.split(' ')[1];
        const DECODED = JWT.verify(TOKEN, process.env.JWT_SECRET);
        const user = await User.findById(DECODED._id).select("-password");

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(403).send({ message: 'User unauthorized!' });
    }
};

export default auth;