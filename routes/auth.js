import { Router } from 'express';
import db from '../db.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

//auth
import handleLogin from '../controllers/auth/login.js';
import handleRegister from '../controllers/auth/register.js';
import handleLogout from '../controllers/auth/logout.js';
import handleConfirm from '../controllers/auth/confirm_pass.js';
import handleReset from '../controllers/auth/reset_pass.js';
import jwt from "jsonwebtoken";
//user
import getUsers from '../controllers/user/get_users.js';

const router = Router();
//
router.post('/login', (req, res) => handleLogin(req, res, db, bcrypt));
router.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));
router.post('/logout', (req, res) => handleLogout(req, res));
router.post('/password-reset', (req, res) => handleReset(req, res, jwt));
router.post('/password-reset/:confirm_token', (req, res) => handleConfirm(req, res,jwt, nodemailer));
//
router.get('/get_users', (req, res) => getUsers(req, res, db));
export default router;
