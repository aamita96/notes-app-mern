
import mongoose from "mongoose";

/*
 * Legacy Mongoose options (no longer required in Mongoose 6+):
 *
 * useNewUrlParser   -> Use modern MongoDB connection string parser.
 * useUnifiedTopology -> Use modern connection/discovery engine.
 * useCreateIndex    -> Use createIndex() instead of ensureIndex().
 * useFindAndModify  -> Use modern findOneAndUpdate() APIs.
 *
 * All of the above are now defaults and have been removed.
 */
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit();
    }
}