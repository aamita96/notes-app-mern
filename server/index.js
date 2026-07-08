
import express from 'express';
import helmet from 'helmet';
// import { config } from 'dotenv';
//          OR
import 'dotenv/config';
import { connectDB } from "./config/dbconfig.js";

// Requiring Routes
import NoteRoutes from './routes/note.routes.js';
import UserRoutes from './routes/user.routes.js';
import { ErrorHandler, NotFound } from './middleware/error-handler.middleware.js';
import { globalLimiter } from './middleware/rate-limiter.js';


// config(); // Load variable from .env
const app = express();
app.use(express.json());
app.use(helmet());

connectDB();

const PORT = process.env.PORT || 3000;


app.use(globalLimiter);

app.get("/", (req, res, next) => {
    res.send("Welcome to the Express Application.");
});

// Routes Handling
app.use('/api/users', UserRoutes);
app.use('/api/notes', NoteRoutes);


// Error Handlers
app.use(NotFound);
app.use(ErrorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});