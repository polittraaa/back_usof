import express, { response } from 'express';
import bodyParser from 'body-parser'; 
import session from 'express-session';
import cookieParser from "cookie-parser";
import database  from './db.js';
import cors from 'cors';
import dotenv from "dotenv";
import authRoutes from './routes/auth.js';
dotenv.config();

//import routes from "./controllers";
import bcrypt from 'bcrypt' 
const saltRounds = 10;

const app = express();
const PORT = 3001;
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie:{
            maxAge: 60000 * 60,
        },
    })
);

app.use('/api/auth', authRoutes);
//app.post('/api/auth/password-reset/:confirm_token', (req, res));

// user
app.get('/api/users', (req, res) => {
    res.send(database('users'));
});

app.listen(PORT, () => {
	console.log(`Listen at http://localhost:${PORT}`)
});