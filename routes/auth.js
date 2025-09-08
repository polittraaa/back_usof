import { Router } from 'express';

import handleLogin from '../controllers/auth/login.js';
import handleRegister from '../controllers/auth/register.js';
import handleLogout from '../controllers/auth/logout.js';

import db from '../db.js';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/login', (req, res) => handleLogin(req, res, db, bcrypt));
router.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));
router.post('/logout', (req, res) => handleLogout(req, res));

export default router;
